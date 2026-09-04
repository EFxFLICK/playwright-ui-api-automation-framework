import { Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }
}