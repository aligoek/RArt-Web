const productsData = require('./products.json');

const METAL_PRICE_API_URL = 'https://api.metalpriceapi.com/v1/latest';
const API_KEY = process.env.METAL_PRICE_API_KEY; 

const GRAMS_PER_TROY_OUNCE = 31.1035; 

const getProducts = async (filters = {}) => {
    let goldPrice; 
    try {
        const response = await fetch(
            `${METAL_PRICE_API_URL}?api_key=${API_KEY}&base=USD&currencies=XAU`
        );

        if (!response.ok) {
            throw new Error(`API'den veri çekilemedi: ${response.statusText}`);
        }
        const data = await response.json();

        const xauToUsdRate = data?.rates?.XAU;

        if (typeof xauToUsdRate !== 'number' || xauToUsdRate <= 0) {
            throw new Error('API yanıtında geçerli altın fiyatı (XAU oranı) bulunamadı.');
        }

        const pricePerTroyOunceUSD = 1 / xauToUsdRate;

        goldPrice = pricePerTroyOunceUSD / GRAMS_PER_TROY_OUNCE;
        console.log(`Gerçek zamanlı ons fiyatı: ${pricePerTroyOunceUSD} USD/ons`);
        console.log(`Gerçek zamanlı altın fiyatı (USD/gram): ${goldPrice}`);

    } catch (error) {
        console.error('Altın fiyatı çekilirken bir hata oluştu:', error.message);
        
        goldPrice = 75.50; 
        console.log(`Fallback altın fiyatı kullanılıyor: ${goldPrice} USD/gram`);
    }

    let products = productsData.map(product => {
        const price = (product.popularityScore + 1) * product.weight * goldPrice;
        return {
            ...product,
            price: price,
            priceFormatted: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price),
            rating: (product.popularityScore * 5).toFixed(1)
        };
    });

   
    if (filters.minPrice) {
        products = products.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
        products = products.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.minPopularity) {
        products = products.filter(p => p.popularityScore >= filters.minPopularity);
    }
    
    return products;
};

module.exports = { getProducts };