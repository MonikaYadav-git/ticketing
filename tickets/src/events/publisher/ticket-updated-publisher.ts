import { Publisher, Subjects, TicketUpdatedEvent } from '@littlebench/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
