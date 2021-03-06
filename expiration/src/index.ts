import { OrderCreatedListener } from './events/listener/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  console.log('starting in 3 2 1...');
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

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
