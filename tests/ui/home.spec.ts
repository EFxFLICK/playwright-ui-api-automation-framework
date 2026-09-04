import {test, expect} from "@playwright/test"
import { HomePage } from "../../pages/home.page"

test('should load the Automation Exercise home page', async ({page})=> {
const homepage = new HomePage(page)
await homepage.open() 
await expect(page).toHaveTitle(/Automation Exercise/)
})