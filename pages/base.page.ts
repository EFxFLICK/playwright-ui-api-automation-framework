import {Page} from "@playwright/test"

export class BasePage {
    protected readonly page: Page;

    get currentUrl(): string {
        return this.page.url();
}

    constructor(page : Page) {
        this.page = page
    }

    async navigate(path = "/"): Promise<void> {
        await this.page.goto(path)
    }
} 