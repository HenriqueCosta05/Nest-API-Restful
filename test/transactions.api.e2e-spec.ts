import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/infra/framework/app.module';
import { HttpExceptionFilter } from '../src/shared/exceptions/GlobalValidation';

describe('Transactions API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await request(app.getHttpServer())
      .delete('/transactions')
      .expect(204);
  });

  it('should create a transaction', async () => {
    const transaction = {
      amount: 123.45,
      timestamp: new Date().toISOString(),
    };

    return request(app.getHttpServer())
      .post('/transactions')
      .send(transaction)
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body.amount).toBe(123.45);
      });
  });

  it('should reject negative amount', async () => {
    const invalidTransaction = {
      amount: -10.0,
      timestamp: new Date().toISOString(),
    };

    return request(app.getHttpServer())
      .post('/transactions')
      .send(invalidTransaction)
      .expect(400);
  });

  it('should reject future timestamp', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const invalidTransaction = {
      amount: 100,
      timestamp: tomorrow.toISOString(),
    };

    return request(app.getHttpServer())
      .post('/transactions')
      .send(invalidTransaction)
      .expect(400);
  });

  it('should delete all transactions', async () => {
    // First create a transaction
    const transaction = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    await request(app.getHttpServer())
      .post('/transactions')
      .send(transaction)
      .expect(201);

    // Then delete all
    return request(app.getHttpServer())
      .delete('/transactions')
      .expect(204);
  });
});