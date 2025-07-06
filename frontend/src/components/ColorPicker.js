// frontend/src/components/ColorPicker.js
import React from 'react';

// ColorPicker bileşeni, ürün renk seçeneklerini gösterir ve seçilen rengi yönetir.
const ColorPicker = ({ colors, selectedColor, onColorChange }) => {
    // Renk anahtarlarını isim ve hex kodlarına eşleyen bir harita
    const colorMap = {
        yellow: { name: 'Yellow Gold', hex: '#E6CA97' },
        white: { name: 'White Gold', hex: '#D9D9D9' },
        rose: { name: 'Rose Gold', hex: '#E1A4A9' }
    };

    return (
        // Bootstrap'in d-flex ve mt-2 sınıfları kullanıldı
        <div className="d-flex flex-column align-items-start mt-2">
            <div className="d-flex gap-2">
                {/* Her renk seçeneği için bir nokta oluştur */}
                {Object.keys(colors).map(colorKey => (
                    <div
                        key={colorKey}
                        className={`color-dot ${selectedColor === colorKey ? 'selected' : ''}`}
                        style={{ backgroundColor: colorMap[colorKey].hex }}
                        onClick={() => onColorChange(colorKey)} // Tıklandığında renk değiştirme işlevini çağır
                        title={colorMap[colorKey].name} // Fare üzerine gelindiğinde renk adını göster
                    ></div>
                ))}
            </div>
            {/* Seçilen rengin adını göster */}
            <span className="text-muted small mt-1 font-avenir-book">{colorMap[selectedColor].name}</span>
        </div>
    );
};

export default ColorPicker;
