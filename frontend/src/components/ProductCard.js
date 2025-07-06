// frontend/src/components/ProductCard.js
import React, { useState } from 'react';
import { Card } from 'react-bootstrap'; // React-Bootstrap Card bileşenini içe aktar
import StarRating from './StarRating';
import ColorPicker from './ColorPicker';

// ProductCard bileşeni, tek bir ürünün bilgilerini ve etkileşimlerini gösterir.
const ProductCard = ({ product }) => {
    // Ürünün seçilen rengini yönetmek için state
    const [selectedColor, setSelectedColor] = useState('yellow'); // Varsayılan olarak sarı altın seçili

    return (
        // React-Bootstrap Card bileşeni kullanıldı
        <Card className="text-center h-100"> {/* Shadow ve border kaldırıldı */}
            <div className="position-relative w-100 product-image-container"> {/* Yeni sınıf eklendi */}
                {/* Ürün görseli, seçilen renge göre değişir */}
                <Card.Img
                    variant="top"
                    src={product.images[selectedColor]}
                    alt={product.name}
                    className="h-100 w-100 object-fit-contain p-3"
                    // Resim yüklenemezse yedek bir yer tutucu resim göster
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/f0f0f0/ccc?text=Image+Not+Found'; }}
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between text-start"> {/* İçerik sola yaslandı */}
                <div>
                    {/* Ürün adı fontu güncellendi */}
                    <Card.Title className="product-title-text text-dark">{product.name}</Card.Title>
                    {/* Ürün fiyatı fontu güncellendi */}
                    <Card.Text className="price-text text-muted mt-1">{product.priceFormatted}</Card.Text>
                    {/* Renk seçici bileşeni */}
                    <ColorPicker
                        colors={product.images}
                        selectedColor={selectedColor}
                        onColorChange={setSelectedColor} // Renk değiştiğinde state'i güncelle
                    />
                </div>
                {/* Yıldız derecesi ve puanı */}
                <div className="product-rating-container"> {/* Yeni sınıf eklendi */}
                    <StarRating rating={parseFloat(product.rating)} />
                    <span className="rating-text text-muted">{product.rating}/5.0</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
