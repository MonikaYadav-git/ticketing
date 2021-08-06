import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@littlebench/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    //Find the order

    const order = await Order.findByEvent({
      id: data.id,
      version: data.version,
    });

    //if no order, throw error
    if (!order) throw new Error('Order not found');

    if (order.status === OrderStatus.Cancelled)
      throw new Error('Order is already cancelled');

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    //ack message
    msg.ack();
  }
}
