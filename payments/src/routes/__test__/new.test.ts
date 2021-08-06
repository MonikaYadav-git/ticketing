import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Order } from '../../models/order';
import { OrderStatus } from '@littlebench/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

//jest.mock('../../stripe.ts');

it('returns 404 if order doesnt exist', async () => {
  const orderId = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({ token: '123', orderId: orderId })
    .expect(404);
});

it('returns 401 if order belongs to other user', async () => {
  const order = Order.build({
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    userId: '54540',
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({ token: '434', orderId: order.id })
    .expect(401);
});

it('returns 400 if order status is cancelled', async () => {
  const user = global.signup('1223');

  const order = Order.build({
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    userId: '1223',
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', user)
    .send({ token: '434', orderId: order.id })
    .expect(400);
});

it('successfull payment', async () => {
  const user = global.signup('1223');

  const price = Math.floor(Math.random() * 100000);

  const order = Order.build({
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    price: price,
    userId: '1223',
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', user)
    .send({ token: 'tok_visa', orderId: order.id })
    .expect(201);

  const charges = await stripe.charges.list({ limit: 1 });
  // console.log(charges);
  const charge = charges.data.find((c) => {
    return c.amount === price * 100;
  });

  expect(charge).toBeDefined();

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: charge!.id,
  });

  expect(payment).not.toBeNull();

  /***For mocking stripe */
  //   const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  //   expect(chargeOptions.source).toEqual('tok_visa');
  //   expect(chargeOptions.amount).toEqual(20 * 100);
});
