import React from 'react';

const ColorPicker = ({ colors, selectedColor, onColorChange }) => {
    
    const colorMap = {
        yellow: { name: 'Yellow Gold', hex: '#E6CA97' },
        white: { name: 'White Gold', hex: '#D9D9D9' },
        rose: { name: 'Rose Gold', hex: '#E1A4A9' }
    };

    return (
        <div className="d-flex flex-column align-items-start mt-2">
            <div className="d-flex gap-2">
                {}
                {Object.keys(colors).map(colorKey => (
                    <div
                        key={colorKey}
                        className={`color-dot ${selectedColor === colorKey ? 'selected' : ''}`}
                        style={{ backgroundColor: colorMap[colorKey].hex }}
                        onClick={() => onColorChange(colorKey)} 
                        title={colorMap[colorKey].name} 
                    ></div>
                ))}
            </div>
            {}
            <span className="text-muted small mt-1 font-avenir-book">{colorMap[selectedColor].name}</span>
        </div>
    );
};

export default ColorPicker;
