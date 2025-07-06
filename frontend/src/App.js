// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; // React-Bootstrap bileşenlerini içe aktar
import ProductCarousel from './components/ProductCarousel';
import { fetchProductsAPI } from './api/products'; // API servisinden ürün çekme fonksiyonunu içe aktar
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS'ini içe aktar

// Ana uygulama bileşeni
const App = () => {
    const [products, setProducts] = useState([]); // Ürünleri tutmak için state
    const [loading, setLoading] = useState(true); // Yükleme durumunu tutmak için state
    const [error, setError] = useState(null); // Hata durumunu tutmak için state

    useEffect(() => {
        // Ürünleri yüklemek için asenkron fonksiyon
        const loadProducts = async () => {
            try {
                setLoading(true); // Yüklemeyi başlat
                const data = await fetchProductsAPI(); // API'den ürünleri çek
                console.log("Çekilen ürünler:", data); // BURAYA EKLEYİN
                setProducts(data); // Ürünleri state'e kaydet
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu.'); // Hata mesajını ayarla
                console.error(err); // Konsola hatayı yazdır
            } finally {
                setLoading(false); // Yüklemeyi bitir
            }
        };
        loadProducts(); // Fonksiyonu çağır
    }, []); // Sadece bir kere çalışması için boş bağımlılık dizisi

    return (
        // Bootstrap Container kullanıldı ve yeni bir sınıf eklendi
        <Container className="py-5 main-content-container">
            <Row className="text-center mb-4">
                <Col>
                    {/* Başlık fontu ve rengi güncellendi, divider kaldırıldı */}
                    <h1 className="product-list-title text-dark">Product List</h1>
                    {/* Divider kaldırıldı */}
                </Col>
            </Row>

            {/* Yükleme durumu */}
            {loading && (
                <Row className="text-center py-5">
                    <Col>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2">Products are loading...</p>
                    </Col>
                </Row>
            )}
            {/* Hata durumu */}
            {error && (
                <Row className="text-center py-5">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}
            {/* Yükleme tamamlandığında ve hata yoksa ürün karuselini göster */}
            {!loading && !error && <ProductCarousel products={products} />}
        </Container>
    );
};

export default App;
