import {registerAs} from '@nestjs/config';
import { User } from '../modules/users/user.model';
import { Event } from '../modules/events/event.model';
import { Location } from '../modules/locations/location.model';

export const app = registerAs('app', () => ({
    port: process.env.APP_PORT
}));

export const jwt = registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET_KEY,
    expires: process.env.JWT_SECRET_EXPIRES
}));

export const db = registerAs('db', () => ({
    type: 'postgres',
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    migrationsRun: false,
    entities: [
      User, Event, Location
    ],
    logging: true,
    synchronize: true,
}));