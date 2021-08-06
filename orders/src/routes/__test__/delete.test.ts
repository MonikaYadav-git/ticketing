import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  return ticket;
};

it('deletes order by order id', async () => {
  // Create three tickets
  const ticket = await buildTicket();

  const user = global.signup();

  // Create one order as User
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to get order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .expect(204);

  const updatedOrder = await Order.findById(order.id);
  // Make sure status is set to cancelled
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('returns error if not authorized', async () => {
  // Create three tickets
  const ticket = await buildTicket();

  const user = global.signup();

  // Create one order as User
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to get order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', global.signup())
    .expect(401);
});

it('emits a cancelled event', async () => {
  const ticket = await buildTicket();

  const user = global.signup();

  // Create one order as User
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make request to get order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', global.signup())
    .expect(401);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
