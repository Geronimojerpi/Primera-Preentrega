import fs from 'fs'

class ProductManager {
    constructor() {
        try {
            this.products = fs.readFileSync("src/fs/Products.json", 'utf8')
            this.products = JSON.parse(this.products)
        } catch (error) {
            this.products = []
        }
    }

    async getProducts() {
        return this.products
    }
}

export default new ProductManager()
