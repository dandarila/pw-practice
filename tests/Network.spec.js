import { test, expect, request } from '@playwright/test';
import APiUtils from '../utils/APiUtils';

let response;
const loginPayload = { userEmail: 'marian@mailinator.com', userPassword: 'Password123' };
const orderPayload = { orders: [{country: 'India', productOrderedId: '676a6619e2b5443b1f004fff'}]};
const fakePayloadOrders = {data: [], message: "No Orders"}

test.beforeAll( async() => {
  const apiContext =  await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayload)
  response = await apiUtils.createOrder(orderPayload);
});

test('@pipeline Client app login', async ({ page }) => {
    await page.addInitScript(value => {window.localStorage.setItem('token', value)}, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {

        const response = await page.request.fetch(await route.request());
        let body = JSON.stringify(fakePayloadOrders);
        console.log("resy: " + response);
        await route.fulfill({
            response, 
            body,
        });
    });
    
    // const page = await context.newPage();
    await page.locator('[routerlink *= "/dashboard/myorders"]').first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent())
    
});


