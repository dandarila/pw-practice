import { test, expect } from '@playwright/test';

test('Broser Context Playwright test', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
    // page.route('**/*.css', route => route.abort());
    // page.route('**/*.{jpg, png, jpeg}', route => route.abort());
	await page.goto('https://rahulshettyacademy.com/loginpagePractise');

	//Locators:
	const userNameField = page.locator('#username');
	const cardTitles = page.locator('.card-body a');
    
    // page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

	await userNameField.fill('rahulshettyacademy');
	await page.locator('[type="password"]').fill('learning');
	await page.locator('#signInBtn').click();
	const title = await cardTitles.first().textContent();
	console.log(title);

	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);

	// const warningText = await page.locator('[style*="block"]').textContent();
	// await expect(page.locator('[style*="block"]')).toContainText(warningText);
	// console.log(warningText);
});

test('UI controls', async ({ page }) => {
	await page.goto('https://rahulshettyacademy.com/loginpagePractise');
	const userNameField = page.locator('#username');
	const signIn = page.locator('#signInBtn');
	const documentLink = page.locator('[href*="documents-request"]');
	const dropdown = page.locator('select.form-control');
	await page.locator('.radiotextsty').nth(1).click();
	await page.locator('#okayBtn').click();
	await dropdown.selectOption('consult');
	expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
	await page.locator('#terms').click();
	await expect(page.locator('#terms')).toBeChecked();
	await page.locator('#terms').uncheck();
	expect(await page.locator('#terms').isChecked()).toBeFalsy();

	await expect(documentLink).toHaveAttribute('class', 'blinkingText');
	await page.pause();
});

test('Child windows handling', async ({ browser }) => {
	const context = await browser.newContext();
	// const userNameField = page.locator('#username');
	const page = await context.newPage();
	await page.goto('https://rahulshettyacademy.com/loginpagePractise');
	const documentLink = page.locator("[href*='documents-request']");
	const [newPage] = await Promise.all([
		context.waitForEvent('page'),
		documentLink.click(),
	]);

	const text = await newPage.locator('.red').textContent();
	const domain = text.split('@')[1].split(' ')[0];
	console.log(domain);
	await page.locator('#username').fill(domain);
	await page.pause();
});
