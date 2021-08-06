import request from 'supertest';
import { app } from '../../app';

it('fails when an email doesnt exist is sent', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when incorrect password is sent', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: 'fdfdfdf',
    })
    .expect(400);
});

it('responds with a cookie when password is correct', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
