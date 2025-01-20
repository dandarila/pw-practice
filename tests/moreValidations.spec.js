import { test, expect } from '@playwright/test';

test('Popup validations', async ({page}) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // await page.goto('https://google.com');
  // await page.goBack();
  // await page.goForward();

  expect (await page.locator('#displayed-text').isVisible());
  await page.locator('#hide-textbox').click();
  expect (await page.locator('#displayed-text').isHidden());

  page.on('dialog', dialog => dialog.accept());
  // page.on('dialog', dialog => dialog.dismiss());

  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();

  const framesPage = page.frameLocator('#courses-iframe');
  framesPage.locator('li a[href*="lifetime-access"]:visible').click();

  const textToSplit = await framesPage.locator('.text h2').textContent();
  const subscribersNumber = textToSplit.split(' ')[1];
  console.log(subscribersNumber);
});