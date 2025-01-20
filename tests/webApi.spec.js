import { test, expect, request } from '@playwright/test';

let token;
const loginPayload = { userEmail: 'marian@mailinator.com', userPassword: 'Password123' }
const orderPayload = { orders: [{country: 'India', productOrderedId: '6581ca979fd99c85e8ee7faf'}]}

test.beforeAll( async() => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: loginPayload});
  expect(loginResponse.ok()).toBeTruthy();
  const responseJson = await loginResponse.json();
  token = responseJson.token;
});

test('Client app login', async ({page}) => {
  page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, token);

  const apiContext = await request.newContext();
  const createOrderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order', 
    { data: orderPayload, headers: {authorization: token}}
  );

  const responseOrderJson = await createOrderResponse.json();
  const orderId = responseOrderJson.orders;

  await page.goto('https://rahulshettyacademy.com/client');
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