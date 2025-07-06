import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'; 
import ProductCarousel from './components/ProductCarousel';
import { fetchProductsAPI } from './api/products'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true); 
                const data = await fetchProductsAPI(); 
                console.log("Çekilen ürünler:", data); 
                setProducts(data); 
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu.'); 
                console.error(err); 
            } finally {
                setLoading(false); 
            }
        };
        loadProducts(); 
    }, []); 

    return (
        <Container className="py-5 main-content-container">
            <Row className="text-center mb-4">
                <Col>
                    {}
                    <h1 className="product-list-title text-dark">Product List</h1>
                    {}
                </Col>
            </Row>

            {}
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
            {}
            {error && (
                <Row className="text-center py-5">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}
            {}
            {!loading && !error && <ProductCarousel products={products} />}
        </Container>
    );
};

export default App;
