import { test, expect } from '@playwright/test';
class LoginPage {
    constructor(page) {
        this.page = page;
        this.sigInbutton = page.locator("[value='Login']");
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.warningText = page.locator('#toast-container');
    }

    async goTo(url) {
        await this.page.goto(url);
    }

    async validLogin (username, password) {
        await this.userName.fill(username);
	    await this.password.fill(password);
	    await this.sigInbutton.click();
    }
    async validateWarningText (text) {
        const warningText = await this.warningText.textContent();
        expect(warningText).toBe(text);
    }
}

export default LoginPage;