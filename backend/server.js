// backend/server.js
const express = require('express');
const cors = require('cors');
const { getProducts } = require('./products'); // Ürün verilerini import et

const app = express();
const PORT = process.env.PORT || 5000;

// CORS'u etkinleştir (frontend'in farklı bir portta çalışmasına izin verir)
app.use(cors());
// JSON body parsing'i etkinleştir
app.use(express.json());

// Ürünleri getiren API endpoint'i
app.get('/api/products', async (req, res) => { // <-- async anahtar kelimesi eklendi
    const filters = req.query;
    try {
        const products = await getProducts(filters); // <-- await eklendi
        // Ağ gecikmesini simüle et
        setTimeout(() => {
            res.json(products);
        }, 500);
    } catch (error) {
        console.error('Ürünler çekilirken bir hata oluştu:', error);
        res.status(500).json({ error: 'Ürünler yüklenemedi.' }); // Hata durumunda uygun yanıt gönder
    }
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});