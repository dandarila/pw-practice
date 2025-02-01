// @ts-check
const { devices } = require('@playwright/test');
const { permission } = require('process');

const config = {
	testDir: './tests',
	retries: 0,
    //workers: 1 -> Cancel the parallelism, Tests will run in sequence 

	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},

	reporter: 'html',
	projects: [
		// {
		// 	name: 'safari', 
		// 	use: {
		// 		browserName: 'webkit',
		// 		headless: false,
		// 		screenshot: 'off',
		// 		trace: 'retain-on-failure', //off,on, retain-on-failure
		// 	}
		// }, 
		{
			name: 'chrome', 
			use: {
				browserName: 'chromium',
				headless: false,
				screenshot: 'on',
				trace: 'retain-on-failure', //off,on, retain-on-failure, 
				// viewport: {width: 720, height: 720}, 
				// ...devices['iPhone 11'], 
				// ignoreHttpsErrors: true,
				permission:['geolocation']
			}
		}
	],
};

module.exports = config;
