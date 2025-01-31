import { test, expect } from '@playwright/test';
const  { customTest } = require('../utils/test-base');
import POManager from '../pageobjects/POManager';
const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));



test('Broswer Context-Validating Error login', async ({ page }) => {
	const text = ' Incorrect email or password. ';
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill('Vasile@vasile.com');
	await page.locator('#userPassword').fill('passwrod');
	await page.locator('#login').click();
	const warningText = await page.locator('[role="alert"]').textContent();
	expect(warningText).toBe(text);
});

test('Happy path login', async ({ page }) => {
    const poManager = new POManager(page);
	const text = ' Login Successfully ';
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

	await loginPage.goTo('https://rahulshettyacademy.com/client');
	await loginPage.validLogin(testData.username, testData.password);
	await loginPage.validateWarningText(text);

	await dashboardPage.searchProduct(testData.productToBuy);
    await page.waitForTimeout(3000);
    await dashboardPage.navigateToCart();

});


customTest.only('Custom test fixture', async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
	const text = ' Login Successfully ';
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

	await loginPage.goTo('https://rahulshettyacademy.com/client');
	await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
	await loginPage.validateWarningText(text);

	await dashboardPage.searchProduct(testDataForOrder.productToBuy);
    await page.waitForTimeout(3000);
    await dashboardPage.navigateToCart();

});


test('Add the product to cart', async ({ page }) => {



  await page.locator("div li").first().waitFor();
  const bool = await page.locator('h3:has-text("Banarsi Saree")').isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator("[placeholder='Select Country']").pressSequentially("IND");
  await page.locator(".ta-results").waitFor();
  const results =  page.locator(".ta-results");
  const countries = await results.locator('button').all();
  for (let country of countries) {
    if (await country.textContent() === " India") {
      await country.click();
      break;
    }
  }

  await page.locator('div:has-text("CVV Code ") ~ input').fill('962');
  await page.locator('div:has-text("Name on Card ") ~ input').fill('Vasilica Putulica');

  await page.pause();

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator('.action__submit').click();

  await expect (page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

  const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  console.log(orderId);

  await page.locator('[routerlink *= "/dashboard/myorders"]').first().click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');

  for (let i=0; i < await rows.count(); i++) {
	const rowOrderId = await rows.nth(i).locator('th').textContent();
	if (orderId.includes(rowOrderId)) {
		await rows.nth(i).locator('button').first().click();
		break;
	}
  }
  expect (orderId.includes(await page.locator('.col-text').textContent())).toBeTruthy();
});
