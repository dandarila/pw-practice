import { test, expect } from '@playwright/test';

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
	const text = ' Login Successfully ';
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill('marian@mailinator.com');
	await page.locator('#userPassword').fill('Password123');
	await page.locator('#login').click();
	const warningText = await page.locator('#toast-container').textContent();
	expect(warningText).toBe(text);

	// await page.waitForLoadState('networkidle');
	await page.locator('.card-body').first().waitFor();
	console.log('Extract all titles from cards');
	const titles = await page.locator('.card-body').locator('b').allInnerTexts();
	console.log(titles);
});

test.only('Add the product to cart', async ({ page }) => {
	const text = ' Login Successfully ';
	await page.goto('https://rahulshettyacademy.com/client');
	await page.locator('#userEmail').fill('marian@mailinator.com');
	await page.locator('#userPassword').fill('Password123');
	await page.locator('#login').click();
	const warningText = await page.locator('#toast-container').textContent();
	expect(warningText).toBe(text);

	const productToBuy = 'ZARA COAT 3';

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
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
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

  await page.locator('text=CVV Code ').locator('input').fill('962');
  await page.locator('text=Name on Card ').locator('input').fill('Vasilica Putulica');

	await page.pause();
});