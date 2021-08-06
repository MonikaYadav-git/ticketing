import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledEvent } from '@littlebench/common';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  //create instance of listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = mongoose.Types.ObjectId().toHexString();
  //create and save a ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '12324',
  });

  ticket.set({ orderId });

  await ticket.save();

  //create a fake data event
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it('publishes a ticket updated event', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('maps an order with ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  const updatedTicket = await Ticket.findById(data.ticket.id);
  expect(ticket).toBeDefined();
  expect(updatedTicket!.orderId).not.toBeDefined();
  //expect(ticket?.price).toEqual(data.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(msg.ack).toHaveBeenCalled();
});
