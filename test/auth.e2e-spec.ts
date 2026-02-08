import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request = require('supertest');

describe('E2E Auth + JWT', () => {
  let app: INestApplication;
  let token = '';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('REGISTER user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'asepsangrajaiblis@yahoo.com',
        password: 'password123',
      })
      .expect(201);
  });

  it('LOGIN user → get JWT', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'asepsangrajaiblis@yahoo.com',
        password: 'password123',
      })
      .expect(201);

    token = res.body.access_token;
  });

  it('ACCESS protected endpoint with JWT', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'E2E Post',
        content: 'E2E Content',
      })
      .expect(201);
  });

  it('FAIL without JWT', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Fail Post',
        content: 'No token',
      })
      .expect(401);
  });
});