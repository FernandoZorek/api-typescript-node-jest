import ServerInitializer from '@src/initializer/ServerInitializer';
import { Application } from 'express';
import supertest from 'supertest';

let app: Application;

beforeAll(async () => {
    app = await ServerInitializer.getServer();
    global.testRequest = supertest(app);
});
