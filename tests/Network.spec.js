import { test, expect, request } from '@playwright/test';
import APiUtils from '../utils/APiUtils';

let response;
const loginPayload = { userEmail: 'marian@mailinator.com', userPassword: 'Password123' };
const orderPayload = { orders: [{country: 'India', productOrderedId: '676a6619e2b5443b1f004fff'}]};

test.beforeAll( async() => {
  const apiContext =  await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayload)
  response = await apiUtils.createOrder(orderPayload);

  console.log("response: " + JSON.stringify(response));
  console.log("res.toky: " + response.token)
});

test('Client app login', async ({page}) => {
    console.log("token from the 1st test: " + response.token);
    
    await page.addInitScript(value => {window.localStorage.setItem('token', value)}, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    
    const storedToken = await page.evaluate(() => window.localStorage.getItem('token'));
    console.log('Stored Token:', storedToken);
    
    await page.locator('[routerlink *= "/dashboard/myorders"]').first().click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i=0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    expect (response.orderId.includes(await page.locator('.col-text').textContent())).toBeTruthy();
});