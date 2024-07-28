import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import Puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class TemplateService {
  private instance: Browser;

  async render(): Promise<void> {
    const pdfString: string = fs.readFileSync(join(__dirname, '../templates/clean-svg.html')).toString('utf8');

    const browser: Browser = await this.getInstance();
    const browserPage: Page = await browser.newPage();
    await browserPage.setContent(pdfString);
    const pdf: Buffer = await browserPage.pdf({ format: 'A6', printBackground: true });
    fs.writeFileSync('test.pdf', pdf);
  }

  async getInstance(): Promise<Browser> {
    if (!this.instance) {
      this.instance = await Puppeteer.launch({});
    }

    return this.instance;
  }
}
