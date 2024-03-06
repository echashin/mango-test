import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      port: this.configService.get('REDIS_PORT'),
      host: this.configService.get('REDIS_HOST'),
      name: configService.get('REDIS_NAME'),
      db: configService.get('REDIS_DB'),
    });
  }

  set<T>(key: string, data: T): T {
    this.redis.set(key, JSON.stringify(data));
    return data;
  }

  async get<T>(key: string): Promise<T | null> {
    const value: string = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: string): void {
    this.redis.del(key);
  }
}
