import { test, expect } from '@playwright/test';

test('Screenshot and visual comparison', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    expect (await page.locator('#displayed-text').isVisible());
    await page.screenshot({path: 'beforeAction.png'});
    await page.locator('#hide-textbox').click();
    expect (await page.locator('#displayed-text').isHidden());
    await page.screenshot({path: 'afterAction.png'});

});

test('visual', async ({page}) => {
    await page.goto('https:/google.com/');
    expect (await page.screenshot()).toMatchSnapshot('landing.png');
});