import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@littlebench/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publisher/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    //Find the ticket that order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //if no ticket, throw error
    if (!ticket) throw new Error('Ticket not found');

    //Mark ticket reserved by setting its OrderId property
    ticket.set({ orderId: undefined });

    //save ticket
    await ticket.save();

    //publish ticket updated
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    //ack message
    msg.ack();
  }
}
