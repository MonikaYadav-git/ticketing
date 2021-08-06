import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { OrderCreatedEvent, OrderStatus } from '@littlebench/common';

const setup = async () => {
  //create instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //create and save a ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '12324',
  });

  await ticket.save();

  //create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: ticket.userId,
    expiresAt: '89899',
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('publishes a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const updateData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  console.log((natsWrapper.client.publish as jest.Mock).mock.calls);

  expect(data.id).toEqual(updateData.orderId);
});

it('maps an order with ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  const updatedTicket = await Ticket.findById(data.ticket.id);
  expect(ticket).toBeDefined();
  expect(updatedTicket?.orderId).toEqual(data.id);
  //expect(ticket?.price).toEqual(data.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(msg.ack).toHaveBeenCalled();
});
