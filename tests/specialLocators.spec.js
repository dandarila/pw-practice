import { test, expect } from '@playwright/test';

test('Plywright Special Locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await expect(page.locator('#exampleCheck1')).toBeChecked();

    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();
});
