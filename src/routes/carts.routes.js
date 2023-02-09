import { Router } from 'express'
import fs from 'fs'
import CartManager from '../api/CartManager.js'

const router = Router()

router.post('/', async (req, res) => {
    const carts = await CartManager.getCarts()
    const cart = {
        products: [],
        id: carts.length == 0 ? 1 : carts.length + 1
    }
    carts.push(cart)
    await fs.promises.writeFile("src/fs/Carritos.json", JSON.stringify(carts, null, '\t'))
    res.status(200).json({
        info: "Carrito creado",
        cart
    })
})

router.get('/', async (req, res) => {
    const carts = await CartManager.getCarts()
    res.status(200).json({
        carts
    })
})

router.get('/:id', async (req, res) => {
    const carts = await CartManager.getCarts()
    const { id } = req.params
    const cart = carts.find(cart => cart.id == id)

    if (!cart) {
        res.status(400).send("Carrito no encontrado")
    }

    res.status(200).json({
        info: "Carrito encontrado",
        cart
    })
})

router.post('/:id/product/:pid', async (req,res) =>{
    const carts = await CartManager.getCarts()
    const { id, pid } = req.params
    const cart = carts.find(cart => cart.id == id)
    if(cart){
        let exist = false;
        console.log(cart.products);
        if(cart.products){
            exist = cart.products.find(exist => exist.id == pid)
            if (!exist) {
                cart.products.push({id: pid, quantity: 1})
            } else{
                const index = cart.products.findIndex(index => index.id === pid)
                cart.products[index].quantity += 1
            }
        }
    }

    
    await fs.promises.writeFile("src/fs/Carritos.json", JSON.stringify(carts, null, '\t'))
    res.json(cart)
})

export default router