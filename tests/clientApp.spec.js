import { test, expect } from '@playwright/test';
import LoginPage from '../pageobjects/LoginPage';

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
	const loginPage = new LoginPage(page);
	const username = 'marian@mailinator.com';
	const password = 'Password123';
	const text = ' Login Successfully ';
    
    await loginPage.goTo('https://rahulshettyacademy.com/client');
	await loginPage.validLogin(username, password);
    const successText = await page.locator('.toast-title').textContent()
	
	expect(successText).toBe(text);

	// await page.waitForLoadState('networkidle');
	await page.locator('.card-body').first().waitFor();
	console.log('Extract all titles from cards');
	const titles = await page.locator('.card-body').locator('b').allInnerTexts();
	console.log(titles);
});

test('Add the product to cart', async ({ page }) => {
	const email = 'marian@mailinator.com'
	const text = ' Login Successfully ';
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill(email);
	await page.locator('#userPassword').fill('Password123');
	await page.locator('#login').click();
	const warningText = await page.locator('#toast-container').textContent();
	expect(warningText).toBe(text);

	const productToBuy = 'Banarsi Saree';

	// await page.locator('.card').nth(0).locator('button').filter({hasText:  ' Add To Cart'}).click();
	// const card = page.locator('.card', (has_text = productToBuy));
	// await card.locator('button').filter({ hasText: ' Add To Cart' }).click();
	// await page.pause();

  await page.waitForTimeout(3000);
	const cards = await page.locator('.card-body').all();

	for (let card of cards) {
    console.log(await card.locator('b').textContent() )
		if (await card.locator('b').textContent() === productToBuy) {
		  await card.locator('text = Add To Cart').click();
      break; 
		}
	}

  await page.locator('[routerlink *= "cart"]').click();
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
