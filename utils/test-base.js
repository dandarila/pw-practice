const {base} = require('@playwright/test');

exports.test = base.test.extend({
    testDayaForOrder: {
        username: "marian@mailinator.com",
        password: "Password123", 
        productName: "Banarsi Saree"
    }
});