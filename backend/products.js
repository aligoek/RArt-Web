// backend/products.js
const productsData = require('./products.json');

// Metal Price API bilgileri
const METAL_PRICE_API_URL = 'https://api.metalpriceapi.com/v1/latest';
const API_KEY = 'e5d76f73a600bf6976618b97a69f01db'; // Sizin Metal Price API anahtarınız

// Troy Ons (XAU) başına gram miktarı
const GRAMS_PER_TROY_OUNCE = 31.1035; 

const getProducts = async (filters = {}) => {
    let goldPrice; // USD/gram olarak altın fiyatı
    try {
        // Metal Price API'den XAU'nun (Ons Altın) USD karşılığını çekme
        const response = await fetch(
            `${METAL_PRICE_API_URL}?api_key=${API_KEY}&base=USD&currencies=XAU`
        );

        if (!response.ok) {
            throw new Error(`API'den veri çekilemedi: ${response.statusText}`);
        }
        const data = await response.json();

        // API yanıtını kontrol edin ve altın fiyatını çıkarın
        // Yanıt formatı genellikle {"rates": {"XAU": 0.00043}} gibi olacaktır
        const xauToUsdRate = data?.rates?.XAU;

        if (typeof xauToUsdRate !== 'number' || xauToUsdRate <= 0) {
            throw new Error('API yanıtında geçerli altın fiyatı (XAU oranı) bulunamadı.');
        }

        // 1 USD = XAU oranı elimizde. Biz 1 XAU = USD oranını istiyoruz.
        const pricePerTroyOunceUSD = 1 / xauToUsdRate;

        // Ons başına fiyatı gram başına fiyata dönüştür
        goldPrice = pricePerTroyOunceUSD / GRAMS_PER_TROY_OUNCE;
        console.log(`Gerçek zamanlı ons fiyatı: ${pricePerTroyOunceUSD} USD/ons`);
        console.log(`Gerçek zamanlı altın fiyatı (USD/gram): ${goldPrice}`);

    } catch (error) {
        console.error('Altın fiyatı çekilirken bir hata oluştu:', error.message);
        // Hata durumunda statik bir fallback değer kullanabiliriz
        goldPrice = 75.50; // Hata durumunda kullanılacak fallback fiyat
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

    // Bonus: Filtreleme
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