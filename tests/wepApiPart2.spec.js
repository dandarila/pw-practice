import { test, expect, request } from '@playwright/test';
let webContext

test.beforeAll( async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('marian@mailinator.com');
    await page.locator('#userPassword').fill('Password123');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

});

test('Client app login', async({}) => {
    const email = "";
    const productName = 'Zara Coat 4';
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles)
})