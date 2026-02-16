import { expect, Page } from "@playwright/test"

export class CommonPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visitarMenu(menu: string) {
        await this.page.getByRole('link', { name: menu}).click()
        const menuTitle = this.page.getByRole('heading', { name: menu})
        await expect(menuTitle).toBeVisible()
    }
}