import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/infra/framework/app.module';
import { HttpExceptionFilter } from '../src/shared/exceptions/GlobalValidation';

describe('Statistics API (e2e)', () => {
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
    // Clear all transactions before each test
    await request(app.getHttpServer())
      .delete('/transactions')
      .expect(204);
  });

  it('should return zero statistics when there are no transactions', async () => {
    return request(app.getHttpServer())
      .get('/statistics')
      .expect(200)
      .expect(res => {
        expect(res.body.count).toBe(0);
        expect(res.body.sum).toBe(0);
        expect(res.body.avg).toBe(0);
        expect(res.body.min).toBe(0);
        expect(res.body.max).toBe(0);
        expect(res.body).toHaveProperty('timestamp');
      });
  });

  it('should calculate statistics from transactions in the last 60 seconds', async () => {
    // Add multiple transactions
    const transactions = [
      { amount: 100, timestamp: new Date().toISOString() },
      { amount: 200, timestamp: new Date().toISOString() },
      { amount: 300, timestamp: new Date().toISOString() }
    ];

    for (const tx of transactions) {
      await request(app.getHttpServer())
        .post('/transactions')
        .send(tx)
        .expect(201);
    }

    // Get and verify statistics
    return request(app.getHttpServer())
      .get('/statistics')
      .expect(200)
      .expect(res => {
        expect(res.body.count).toBe(3);
        expect(res.body.sum).toBe(600);
        expect(res.body.avg).toBe(200);
        expect(res.body.min).toBe(100);
        expect(res.body.max).toBe(300);
        expect(res.body).toHaveProperty('timestamp');
      });
  });

  it('should exclude transactions older than 60 seconds', async () => {
    // Create a current timestamp and one from 70 seconds ago
    const now = new Date();
    const oldTimestamp = new Date(now);
    oldTimestamp.setSeconds(now.getSeconds() - 70);
    
    // First add an old transaction that should be excluded from statistics
    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 999,
        timestamp: oldTimestamp.toISOString()
      })
      .expect(201);

    // Then add a current transaction
    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 123,
        timestamp: now.toISOString()
      })
      .expect(201);

    // Verify statistics only include the recent transaction
    return request(app.getHttpServer())
      .get('/statistics')
      .expect(200)
      .expect(res => {
        expect(res.body.count).toBe(1);
        expect(res.body.sum).toBe(123);
        expect(res.body.min).toBe(123);
        expect(res.body.max).toBe(123);
        expect(res.body.avg).toBe(123);
      });
  });
});