import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from '@littlebench/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
