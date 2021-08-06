import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { app } from './app';
import { TicketCreatedListener } from './events/listener/ticket-created-listener';
import { TicketUpdatedListener } from './events/listener/ticket-updated-listener';
import { ExpirationCompletedListener } from './events/listener/expiration-completed-listener';
import { PaymentCreatedListener } from './events/listener/payment-created.listener';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined!!');
  if (!process.env.MONGO_URI) throw new Error('Mongo URI must be defined!!');

  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS Client must be defined!!');
  if (!process.env.NATS_URL) throw new Error('NATS URL must be defined!!');
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS CLuster Id must be defined!!');

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompletedListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
