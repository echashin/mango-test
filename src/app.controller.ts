import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigInput } from './env-config.input';

@Controller()
export class AppController {
  constructor(private readonly conf: ConfigService<EnvConfigInput>) {}

  @Get()
  index(): string {
    return `${this.conf.get('NAME')} ${this.conf.get('VERSION')}`;
  }
}
