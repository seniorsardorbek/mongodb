/** @format */

import express from 'express';
import Product from '../schemas/Product.js';

const router = express.Router();

router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).send({ data: products });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});


router.post("/products" , async (req, res, next) => {
    try {
        const product =  new Product(req.body)
        await product.save()
        res.status(201).send({ data: product });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
})

export default router;
