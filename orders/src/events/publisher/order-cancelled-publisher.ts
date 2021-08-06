import { Publisher, OrderCancelledEvent, Subjects } from '@littlebench/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
