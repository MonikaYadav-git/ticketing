import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { OrderCreatedEvent, OrderStatus } from '@littlebench/common';
import { Order } from '../../../models/order';

const setup = async () => {
  //create instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: '12454',
    expiresAt: '89899',
    version: 0,
    ticket: {
      id: mongoose.Types.ObjectId().toHexString(),
      price: 20,
    },
  };

  //create a fake message object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('publishes a order created event', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  //write assertations

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();

  //call the onMessage function with the object
  await listener.onMessage(data, msg);

  //write assertations
  expect(msg.ack).toHaveBeenCalled();
});
