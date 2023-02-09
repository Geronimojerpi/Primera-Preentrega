import express from 'express';
import productRoutes from './src/routes/products.routes.js'
import productCart from './src/routes/carts.routes.js'

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json())

server.use('/api/products', productRoutes)

server.use('/api/carts', productCart)

server.get('*', (req, res)=>{
    res.status(404).send("<h1 style=color:red;text-align:center;>Contenido no encontrado</h1>")
})

server.listen(8080, () => console.log("Server listening on port 8080"))