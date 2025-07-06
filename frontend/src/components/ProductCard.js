import React, { useState } from 'react';
import { Card } from 'react-bootstrap'; 
import StarRating from './StarRating';
import ColorPicker from './ColorPicker';

const ProductCard = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState('yellow'); 

    return (
        <Card className="text-center h-100"> {}
            <div className="position-relative w-100 product-image-container"> {}
                {}
                <Card.Img
                    variant="top"
                    src={product.images[selectedColor]}
                    alt={product.name}
                    className="h-100 w-100 object-fit-contain p-3"
                    
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/f0f0f0/ccc?text=Image+Not+Found'; }}
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between text-start"> {}
                <div>
                    {}
                    <Card.Title className="product-title-text text-dark">{product.name}</Card.Title>
                    {}
                    <Card.Text className="price-text text-muted mt-1">{product.priceFormatted}</Card.Text>
                    {}
                    <ColorPicker
                        colors={product.images}
                        selectedColor={selectedColor}
                        onColorChange={setSelectedColor} 
                    />
                </div>
                {}
                <div className="product-rating-container"> {}
                    <StarRating rating={parseFloat(product.rating)} />
                    <span className="rating-text text-muted">{product.rating}/5.0</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
