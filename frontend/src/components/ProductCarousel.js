import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules'; // Import modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

// Install Swiper modules
Swiper.use([Navigation, Scrollbar]); // Install necessary modules

const ProductCarousel = ({ products }) => {
    const swiperRef = useRef(null);
    const swiperContainerRef = useRef(null); // Reference for the Swiper container

    useEffect(() => {
        // Mevcut Swiper örneğini yok et, böylece yeni ürünlerle yeniden başlatılabilir.
        if (swiperRef.current) {
            swiperRef.current.destroy(true, true);
        }

        // Initialize Swiper only if the container ref is available
        if (swiperContainerRef.current) {
            swiperRef.current = new Swiper(swiperContainerRef.current, { // Use the ref directly
                loop: false,
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                    hide: false,
                    draggable: true,
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                },
                // DOM değişikliklerini gözlemle ve Swiper'ı yeniden başlat
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
            });
        }

        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, [products]); // `products` değiştiğinde Swiper'ı yeniden başlat

    if (!products || products.length === 0) { // Ürün yoksa mesaj göster
        return <div className="text-center p-5">No products found.</div>;
    }

    return (
        <div className="position-relative">
            <div className="swiper-container" ref={swiperContainerRef}> {/* Attach the ref here */}
                <div className="swiper-wrapper py-4">
                    {products.map((product, index) => (
                        <div key={index} className="swiper-slide">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                {/* Kaydırma çubuğu */}
                <div className="swiper-scrollbar mt-4"></div>
            </div>
            {/* Gezinme düğmeleri */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
};

export default ProductCarousel;