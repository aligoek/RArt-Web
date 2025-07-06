import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import ProductCard from './ProductCard';

Swiper.use([Navigation, Scrollbar]); 

const ProductCarousel = ({ products }) => {
    const swiperRef = useRef(null);
    const swiperContainerRef = useRef(null); 

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.destroy(true, true);
        }

        if (swiperContainerRef.current) {
            swiperRef.current = new Swiper(swiperContainerRef.current, { 
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
    }, [products]); 

    if (!products || products.length === 0) { 
        return <div className="text-center p-5">No products found.</div>;
    }

    return (
        <div className="position-relative">
            <div className="swiper-container" ref={swiperContainerRef}> {}
                <div className="swiper-wrapper py-4">
                    {products.map((product, index) => (
                        <div key={index} className="swiper-slide">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                {}
                <div className="swiper-scrollbar mt-4"></div>
            </div>
            {}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
};

export default ProductCarousel;