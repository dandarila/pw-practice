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

  console.log("response: " + JSON.stringify(response));
  console.log("res.toky: " + response.token)
});

test('Client app login', async ({page}) => {
    console.log("token from the 1st test: " + response.token);
    
    await page.addInitScript(value => {window.localStorage.setItem('token', value)}, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/674de029eb3c71ba7921de78', async route => {
        //intercepting response - API response -> send to browser to render it on FE
        const response = await page.request.fetch(route.request());
        let body = fakePayloadOrders;
        console.log(response);
        route.fulfill({
            response, 
            body,
        });
    });
    
    const storedToken = await page.evaluate(() => window.localStorage.getItem('token'));
    console.log('Stored Token:', storedToken);
    
    await page.locator('[routerlink *= "/dashboard/myorders"]').first().click();
    // await page.locator('tbody').waitFor();
    // const rows = page.locator('tbody tr');

    
});