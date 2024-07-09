/* eslint-disable @typescript-eslint/no-unsafe-call */
import DbStartUp from '@src/interface/DbStartUp';
import LoggerUtil from '@src/util/LoggerUtil';
import mongoose from 'mongoose';

class DbInitializer implements DbStartUp {
    public async open(): Promise<void> {
        try {
            const mongoUri = process.env.DB_HOST || 'mongodb://root:example@localhost:27017/library';                        
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            });

            mongoose.connection.on('connected', () => {
                LoggerUtil.debug('Mongo: connected');
            });

            mongoose.connection.on('disconnected', () => {
                LoggerUtil.error('Mongo: disconnected');
            });

            mongoose.connection.on('error', (err) => {
                LoggerUtil.error(`Mongo: ${err}`);
            });

            LoggerUtil.debug('Connected to MongoDB');
        } catch (error) {
            LoggerUtil.error(`Error connecting to MongoDB: ${error}`);
        }
    }

    public async close(): Promise<void> {
        await mongoose.disconnect();
    }
}

export default new DbInitializer();
