class DashboardPage {

    constructor(page) {
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchProduct(productName) {
        await this.products.first().waitFor();
        const titles = await this.productsText.allInnerTexts();
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('text = Add To Cart').click();
                break; 
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

  
}

export default DashboardPage;