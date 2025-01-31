const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testDataForOrder: {
        username: "marian@mailinator.com",
        password: "Password123", 
        productName: "Banarsi Saree"
    }
});