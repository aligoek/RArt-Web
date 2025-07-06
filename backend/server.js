const express = require('express');
const cors = require('cors');
const { getProducts } = require('./products'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get('/api/products', async (req, res) => { 
    const filters = req.query;
    try {
        const products = await getProducts(filters); 
        setTimeout(() => {
            res.json(products);
        }, 500);
    } catch (error) {
        console.error('Ürünler çekilirken bir hata oluştu:', error);
        res.status(500).json({ error: 'Ürünler yüklenemedi.' }); 
    }
});

app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});