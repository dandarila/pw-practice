import { test, expect, request } from '@playwright/test';
import APiUtils from '../utils/APiUtils';

let response;
const loginPayload = { userEmail: 'marian@mailinator.com', userPassword: 'Password123' };
const orderPayload = { orders: [{country: 'India', productOrderedId: '676a6619e2b5443b1f004fff'}]};
const fakePayloadOrders = {data: [], message: "No Orders"};

test.beforeAll( async() => {
    const apiContext =  await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Request intercept', async ({ page }) => {
    await page.addInitScript(value => {window.localStorage.setItem('token', value)}, response.token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('[routerlink *= "/dashboard/myorders"]').first().click();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', 
        route => route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1224329897'}));
    await page.locator("button:has-text('View')").first().click();
    expect (await page.locator('.email-wrapper.ml-5.ng-star-inserted').locator('p').innerText()).toBe('You are not authorize to view this order');
});


