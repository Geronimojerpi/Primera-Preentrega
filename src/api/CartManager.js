import fs from 'fs'

class CartManager {
    constructor() {
        try {
            this.carts = fs.readFileSync("src/fs/Carritos.json", 'utf8')
            this.carts = JSON.parse(this.carts)
        } catch (error) {
            this.carts = []
        }
    }
    
    async getCarts() {
        return this.carts
    }
}

export default new CartManager()

