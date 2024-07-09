import mock from '@test/__mock__/users.json';
import User from '@src/models/user';
import { omit } from 'lodash';
import { ObjectId } from 'mongoose';
import Db from '@src/initializer/DBInitializer';

describe('Route: User', () => {
    let firstUserId: ObjectId;

    beforeAll(async (done) => {
        await User.insertMany(mock);
        done();
    });

    afterAll(async (done) => {
        await Db.close();
        done();
    });

    describe('CRUD Operations', () => {
        test('test_get_users_success', async (done) => {
            const response = await global.testRequest.get('/api/user');
            const { status, body } = response;

            expect(status).toBe(200);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('data');

            const firstUser = omit(body.data[0], ['_id', '__v']);
            expect(firstUser).toMatchObject(omit(mock[0], ['password']));

            firstUserId = body.data[0]._id;
            done();
        });

        test('test_get_users_single', async (done) => {
            const response = await global.testRequest.get(`/api/user/${firstUserId.toString()}`);
            const { status, body } = response;

            expect(status).toBe(200);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('data');

            expect(typeof body.data).toEqual('object');

            const firstUser = omit(body.data, ['_id', '__v']);
            expect(firstUser).toMatchObject(omit(mock[0], ['password']));

            done();
        });

        test('test_post_users_new', async (done) => {
            const response = await global.testRequest
                .post(`/api/user/`)
                .send({
                    name: 'new user test',
                    userName: 'userInterview',
                    password: '451',
                    activated: true,
                    email: 'userInterview@test.org.br',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(201);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('data');

            expect(typeof body.data).toEqual('object');
            expect(body.data?._id).not.toBeUndefined();
            expect(body.data?.name).toEqual('new user test');
            expect(body.data?.activated).toBeTruthy();

            done();
        });

        test('test_post_users_new_error', async (done) => {
            const response = await global.testRequest
                .post(`/api/user/`)
                .send({
                    name: 'new user test',
                    userName: 'userInterview',
                    activated: true,
                    email: 'userInterview@test.org.br',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(400);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('errors');

            expect(body.errors[0]?.detail).toEqual('Missing invalid required data to create new user');
            done();
        });


        test('test_post_users_email_already_in_use_error', async (done) => {
            const response = await global.testRequest
                .post(`/api/user/`)
                .send({
                    name: 'test',
                    userName: 'test',
                    password: '123',
                    activated: true,
                    email: 'email@test.com',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(409);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('errors');

            expect(body.errors[0]?.detail).toEqual('Email already in use');
            done();
        });

        test('test_post_users_new_error_email', async (done) => {
            const response = await global.testRequest
                .post(`/api/user/`)
                .send({
                    name: 'new user test',
                    userName: 'userInterview',
                    activated: true,
                    password: '451',
                    email: 'userInterview',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(400);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('errors');

            expect(body.errors[0]?.detail).toEqual('Invalid email format');

            done();
        });

        test('test_patch_users_success_activated', async (done) => {
            const user = await User.findOne({ activated: false });
            const response = await global.testRequest
                .patch(`/api/user/${user?._id}`)
                .send({
                    operation: 'enable',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(200);
            expect(body).toBeDefined();
            expect(body).toBeDefined();
            expect(body).toHaveProperty('data');

            expect(typeof body.data).toEqual('object');
            expect(body.data.activated).not.toEqual(user?.activated);
            expect(body.data._id).toEqual(user?._id.toString());

            done();
        });

        test('test_patch_users_success_deactivated', async (done) => {
            const response = await global.testRequest
                .patch(`/api/user/${firstUserId}`)
                .send({
                    operation: 'disable',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(200);
            expect(body).toBeDefined();
            expect(body).toBeDefined();
            expect(body).toHaveProperty('data');

            expect(typeof body.data).toEqual('object');
            expect(body.data.activated).toBeFalsy();
            expect(body.data._id).toEqual(firstUserId);
            done();
        });

        test('test_patch_users_invalid_operation', async (done) => {
            const response = await global.testRequest
                .patch(`/api/user/${firstUserId}`)
                .send({
                    operation: 'test',
                })
                .set('Accept', 'application/json');

            const { status, body } = response;

            expect(status).toBe(400);
            expect(body).toBeDefined();
            expect(body).toHaveProperty('errors');

            expect(body.errors[0]?.detail).toEqual('Operation not allowed. Invalid operation named: test');
            done();
        });
    });
});
