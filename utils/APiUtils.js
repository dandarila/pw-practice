import { test, expect, request } from '@playwright/test';

export default class APiUtils {
    
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() { 
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: this.loginPayload});
        const responseJson = await loginResponse.json();
        const token = responseJson.token;
        return token
    }

    async createOrder(orderPayload) {
        let response = {}
        response.token = await this.getToken();
        const apiContext = await request.newContext();
        const createOrderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', { data: orderPayload, headers: {authorization: response.token}});
        const responseOrderJson = await createOrderResponse.json();
        const orderId = responseOrderJson.orders[0];
        response.orderId = orderId;
        console.log("token from createOrder: " + response.token)
        return response;
    }

}