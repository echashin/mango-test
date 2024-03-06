import * as dotenv from 'dotenv';
import 'reflect-metadata';

import {DataSource} from 'typeorm';

dotenv.config();

const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME,
  ssl: process.env.DATABASE_SSL ? {rejectUnauthorized: false} : false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  subscribers: [],
});


export default AppDataSource;
