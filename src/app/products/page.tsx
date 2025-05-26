'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';

export default function Products() {
    const products = [
        {
            id: 1,
            image: "/images/products/1.png",
            title: "چارت",
            description: 'نمایش اطلاعات پرسنلی ، انبار ، مالی و ... به کمک انواع جدول ها و نمودار ها',
            detailLink: '/products/v1'
        },
        {
            id: 2,
            image: "/images/products/2.png",
            title: 'محصول دوم',
            description: 'توضیحات محصول دوم',
            detailLink: '/products/v1'
        },
        {
            id: 3,
            image: "/images/products/3.png",
            title: 'محصول سوم',
            description: 'توضیحات محصول سوم',
            detailLink: '/products/v1'
        },
    ];

    return (
        <div className="fixed inset-0 w-full h-full bg-black">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                className="w-full h-full"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="relative">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="absolute bottom-0 left-0 right-0 p-12"
                            >
                                <motion.h2 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-5xl font-bold text-primary mb-4"
                                >
                                    {product.title}
                                </motion.h2>
                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="text-xl text-primary-light max-w-2xl"
                                >
                                    {product.description}
                                </motion.p>
                                
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                    className="mt-8 flex gap-4"
                                >
                                    <Link href="/products/v1" >
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-secondary-dark text-white rounded-full hover:bg-gray-200 transition-colors"
                                    >
                                        مشاهده جزئیات
                                    </motion.button></Link>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 border-2 bg-white/60 border-secondary-dark text-secondary-dark rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        تماس با ما
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-4">
                    {products.map((_, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}