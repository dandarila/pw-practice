const { When, Then, Given } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');

Given('The user logins with valid {username} and valid {password}', async (username, password) => {
    const poManager = new POManager(page);
	const text = ' Login Successfully ';
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

	await loginPage.goTo('https://rahulshettyacademy.com/client');
	await loginPage.validLogin(testData[0].username, testData[0].password);
  });

When('The user adds {string} to the Cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Validate that {string} is displayed in the Cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Enter valid details and place the order', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Validate order is present in the Order History', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

