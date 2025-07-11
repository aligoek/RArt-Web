const API_BASE_URL = 'https://rart-web.onrender.com'; 

export const fetchProductsAPI = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/api/products?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ürünler çekilirken bir hata oluştu:", error);
        throw error; 
    }
};
