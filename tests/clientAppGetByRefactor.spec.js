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
	await page.getByPlaceholder('email@example.com').fill('marian@mailinator.com');
	await page.getByPlaceholder('enter your passsword').fill('Password123');
	await page.getByRole('button', {name: 'Login'}).click();
	const warningText = await page.locator('#toast-container').textContent();
	expect(warningText).toBe(text);

	// await page.waitForLoadState('networkidle');
	await page.locator('.card-body').first().waitFor();
	console.log('Extract all titles from cards');
	const titles = await page.locator('.card-body').locator('b').allInnerTexts();
	console.log(titles);
});

test('Add the product to cart', async ({ page }) => {
	const email = 'marian@mailinator.com';
	const text = ' Login Successfully ';
    const productToBuy = 'Banarsi Saree';

	await page.goto('https://rahulshettyacademy.com/client');
	await page.getByPlaceholder('email@example.com').fill(email);
	await page.getByPlaceholder('enter your passsword').fill('Password123');
	await page.getByRole('button', {name: 'Login'}).click();
	const warningText = await page.locator('#toast-container').textContent();
	expect(warningText).toBe(text);

    await page.locator('.card-body').filter({hasText: productToBuy}).getByRole('button', {name: 'Add to cart'}).click();
    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productToBuy)).toBeVisible();
    await page.getByRole('button', {name: 'Checkout'}).click();
    await page.getByPlaceholder('Select Country').pressSequentially("IND");
    await page.getByRole('button', {name: 'India'}).nth(1).click();
    await page.locator('div:has-text("CVV Code ") ~ input').fill('962');
    await page.locator('div:has-text("Name on Card ") ~ input').fill('Vasilica Putulica');
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText('PLACE ORDER').click();
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
