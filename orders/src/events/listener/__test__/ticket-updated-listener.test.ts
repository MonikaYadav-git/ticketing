import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { TicketUpdatedEvent } from '@littlebench/common';

const setup = async () => {
  //create instance of listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  //create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: 'concert 2',
    price: 30,
    userId: mongoose.Types.ObjectId().toHexString(),
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('finds, updates and saves a ticket', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  const ticket = await Ticket.findById(data.id);

  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call acks if event is not in sequence', async () => {
  const { listener, data, msg } = await setup();

  data.version = 10;

  try {
    //call the onMessage function with the object
    await listener.onMessage(data, msg);
  } catch (error) {}

  //write assertations
  expect(msg.ack).not.toHaveBeenCalled();
});
