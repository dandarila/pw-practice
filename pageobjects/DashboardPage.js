class DashboardPage {

    constructor(page) {
        this.products = page.locatpr('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[raouterlink*="cart"]');
    }


    // await page.waitForLoadState('networkidle');
	await page.locator('.card-body').first().waitFor();
	console.log('Extract all titles from cards');
	const titles = await page.locator('.card-body').locator('b').allInnerTexts();
	console.log(titles);

    async searchProduct(productName) {
        const cards = this.products.all();

        for (let card of cards) {
        console.log(await card.locator('b').textContent() )
            if (await card.locator('b').textContent() === productToBuy) {
              await card.locator('text = Add To Cart').click();
          break; 
            }
        }
    }

  
}