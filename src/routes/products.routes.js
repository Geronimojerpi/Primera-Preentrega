import { Router } from 'express'
import fs from 'fs'
import ProductManager from '../api/ProductManager.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        if (limit != null || limit > 0) {
            const products = await ProductManager.getProducts()
            const productsLimit = products.slice(0, limit)
            res.status(201).json({
                info: "Productos filtrados",
                productsLimit
            })
        } else {    
            const products = await ProductManager.getProducts()
            res.status(201).json({
                info: "Productos encontrados",
                products
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id);
    const products = await ProductManager.getProducts()
    const product = products.find(product => product.id == id)
    if (!product) {
        res.status(404).send("Producto no encontrado")
    }
    res.status(201).json({
        info: "Producto encontrado",
        product
    })
})

router.post('/', async (req, res) => {
    const products = await ProductManager.getProducts()
    const { title, description, code, price, stock, category } = req.body
    if (!title || !description || !code || !price || !stock || !category) {
        throw new Error('La información no fue suficiente para guardar el producto')
    }
    const addedProduct = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category
    }
    products.length === 0 ? addedProduct["id"] = 1 : addedProduct["id"] = products[products.length - 1]["id"] + 1
    products.push(addedProduct)
    try {
        await fs.promises.writeFile("src/fs/Products.json", JSON.stringify(products, null, '\t'))
        console.log("Producto agregado")
    } catch (error) {
        console.log(error)
    }
    res.status(201).json({
        info: "Producto creado",
        addedProduct
    })
})

router.put('/:id', async (req, res) => {
    const products = await ProductManager.getProducts()
    const { id } = req.params
    const { title, description, code, price, stock, category } = req.body
    const updateProduct = products.find(updateProduct => updateProduct.id == id)
    if (updateProduct != null) {
        updateProduct.id
        updateProduct.title = title
        updateProduct.description = description
        updateProduct.code = code
        updateProduct.price = price
        updateProduct.status
        updateProduct.stock = stock
        updateProduct.category = category
    }
    try {
        await fs.promises.writeFile("src/fs/Products.json", JSON.stringify(products, null, '\t'))
        console.log("Producto actualizado")

    } catch (error) {
        console.log(error)
    }
    res.status(201).json({
        info: "Producto actualizado",
        updateProduct
    })
})

router.delete('/:id', async (req, res) => {
    const products = await ProductManager.getProducts()
    const { id } = req.params;
    const product = products.find(product => product.id == id)
    if (product != null) {
        products.splice(products.indexOf(product), 1)
    }
    try {
        await fs.promises.writeFile("src/fs/Products.json", JSON.stringify(products, null, '\t'))
        console.log("Producto actualizado")

    } catch (error) {
        console.log(error)
    }
    res.status(201).json({
        info: "Producto eliminado",
        product
    })
})

export default router;