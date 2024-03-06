import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';

import { AppController } from './app.controller';
import { EnvConfigInput } from './env-config.input';
import { envValidate } from './shared/helpers/env-validate';
import { UniqueRule } from './shared/validators/classes/unique-rule';
import { UserModule } from './user/user.module';

const envFilePath: string = `.env`;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validate: envValidate,
    }),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.errors({ stack: true })),
      transports: [new winston.transports.Console()],
      exitOnError: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvConfigInput>) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DBNAME'),
        synchronize: false,
        dropSchema: false,
        autoLoadEntities: true,
        keepConnectionAlive: true,
        connectTimeoutMS: 6000,
        maxQueryExecutionTime: 2000,
        extra: {
          poolSize: 12,
          max: 12,
          connectionLimit: 12,
          connectionTimeoutMillis: 6000,
        },
        ssl: configService.get<boolean>('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false,
        logging: ['error', 'warn'],
      }),
    }),
    UserModule,
  ],

  controllers: [AppController],
  providers: [UniqueRule],
})
export class AppModule {}
