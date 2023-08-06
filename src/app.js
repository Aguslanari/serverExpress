import express from 'express'
import { ProductManager } from "./ProductManager.js";
import { promises as fs } from 'fs'

const manager = new ProductManager();
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/products', async (req, res) => {
    let productos = await manager.getProducts();
    if (productos) {

        if (req.query.limit)
            productos = productos.slice(0, parseInt(req.query.limit));

        return res.send(productos);
    }

    return res.send("not found");
})

app.get('/products/:id', async (req, res) => {
    const product = await manager.getProductById(parseInt(req.params.id));
    if (product)
        return res.send(product);

    res.send("Producto no encontrado");
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})