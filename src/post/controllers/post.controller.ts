import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { TemplateService } from '../services/template.service';

@Controller('post')
export class PostController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('render')
  @ApiOperation({ summary: 'Create pdf' })
  @ApiCreatedResponse({ type: Boolean })
  async renderPost(): Promise<boolean> {
    await this.templateService.render();
    return true;
  }
}
