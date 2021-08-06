import { Publisher, PaymentCreatedEvent, Subjects } from '@littlebench/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
