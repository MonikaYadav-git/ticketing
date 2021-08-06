import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteEvent, OrderStatus } from '@littlebench/common';
import { ExpirationCompletedListener } from '../expiration-completed-listener';

const setup = async () => {
  //create instance of listener
  const listener = new ExpirationCompletedListener(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const order = Order.build({
    userId: '1223',
    expiresAt: new Date(),
    status: OrderStatus.Created,
    ticket,
  });

  await order.save();

  //create a fake data event
  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};

it('emits order cancelled event', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id).toEqual(order.id);
});

it('updates order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);
  //   //write assertations
  expect(msg.ack).toHaveBeenCalled();
});
