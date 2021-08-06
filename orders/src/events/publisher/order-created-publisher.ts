import { Publisher, OrderCreatedEvent, Subjects } from '@littlebench/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
