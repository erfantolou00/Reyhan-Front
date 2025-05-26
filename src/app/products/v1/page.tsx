'use client';

import { Card, Title, Text, Grid, Col, BarList, DonutChart, AreaChart } from '@tremor/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GridView() {
    const [activeTab, setActiveTab] = useState('overview');

    // Sample data for charts
    const salesData = [
        { name: 'فروردین', value: 4000, target: 3500 },
        { name: 'اردیبهشت', value: 3000, target: 3500 },
        { name: 'خرداد', value: 2000, target: 3500 },
        { name: 'تیر', value: 2780, target: 3500 },
        { name: 'مرداد', value: 1890, target: 3500 },
        { name: 'شهریور', value: 2390, target: 3500 },
    ];

    const inventoryData = [
        { name: 'موجودی', value: 45 },
        { name: 'در حال تولید', value: 30 },
        { name: 'تحویل شده', value: 25 },
    ];

    const topProducts = [
        { name: 'محصول الف', value: 456 },
        { name: 'محصول ب', value: 351 },
        { name: 'محصول ج', value: 271 },
        { name: 'محصول د', value: 191 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <motion.div variants={itemVariants} className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">داشبورد مدیریتی ERP</h1>
                    <p className="text-gray-600 text-lg">نمایش جامع داده‌ها و تحلیل‌های کسب و کار</p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                    <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                        {['overview', 'sales', 'inventory', 'reports'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                                    activeTab === tab
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                                }`}
                            >
                                {tab === 'overview' && 'نمای کلی'}
                                {tab === 'sales' && 'فروش'}
                                {tab === 'inventory' && 'موجودی'}
                                {tab === 'reports' && 'گزارش‌ها'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* First Card - Features and Chart */}
                <motion.div variants={itemVariants} className="mb-10">
                    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <Title className="text-2xl font-bold text-gray-900">ویژگی‌های محاسباتی پیشرفته</Title>
                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">محاسبات هوشمند</h3>
                                        <p className="text-gray-700 leading-relaxed">سیستم محاسباتی پیشرفته با قابلیت تحلیل داده‌ها در لحظه و ارائه نتایج دقیق</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">گزارش‌گیری دقیق</h3>
                                        <p className="text-gray-700 leading-relaxed">امکان تهیه گزارش‌های دقیق و جامع از تمامی عملیات مالی با جزئیات کامل</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">پیش‌بینی هوشمند</h3>
                                        <p className="text-gray-700 leading-relaxed">تحلیل روند و پیش‌بینی آینده با استفاده از الگوریتم‌های هوشمند و یادگیری ماشین</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <Title className="text-2xl font-bold text-gray-900 mb-6">تحلیل روند فروش</Title>
                                <AreaChart
                                    className="h-80"
                                    data={salesData}
                                    index="name"
                                    categories={["value", "target"]}
                                    colors={["blue", "gray"]}
                                    showAnimation={true}
                                    showLegend={true}
                                    showGridLines={true}
                                    showTooltip={true}
                                    showXAxis={true}
                                    showYAxis={true}
                                    yAxisWidth={40}
                                    valueFormatter={(value) => `${value.toLocaleString()} تومان`}
                                />
                            </div>
                        </div>
                    </Card>
                    <div className='w-full h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-blue-300'></div>
                </motion.div>

                {/* Second Card - Chart and Features */}
                <motion.div variants={itemVariants} className="mb-10">
                    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <Title className="text-2xl font-bold text-gray-900 mb-6">وضعیت موجودی و تولید</Title>
                                <DonutChart
                                    className="h-80"
                                    data={inventoryData}
                                    category="value"
                                    index="name"
                                    colors={["#3B82F6", "#06B6D4", "#6366F1"]}
                                    showAnimation={true}
                                    showLabel={true}
                                    valueFormatter={(value: number) => `${value}%`}
                                    showTooltip={true}
                                />
                                <div className="mt-4 flex justify-center gap-4">
                                    {inventoryData.map((item, index) => (
                                        <div key={item.name} className="flex items-center gap-2">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ backgroundColor: ["#3B82F6", "#06B6D4", "#6366F1"][index] }}
                                            />
                                            <span className="text-sm text-gray-600">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8">
                                <Title className="text-2xl font-bold text-gray-900">مدیریت هوشمند موجودی</Title>
                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">کنترل خودکار موجودی</h3>
                                        <p className="text-gray-700 leading-relaxed">سیستم هشدار خودکار برای سطح موجودی و سفارش مجدد با قابلیت تنظیم آستانه‌های مختلف</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">بهینه‌سازی انبار</h3>
                                        <p className="text-gray-700 leading-relaxed">مدیریت کارآمد فضای انبار و چیدمان بهینه محصولات با استفاده از الگوریتم‌های پیشرفته</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">پیگیری زنجیره تأمین</h3>
                                        <p className="text-gray-700 leading-relaxed">مدیریت کامل فرآیند تأمین مواد اولیه و محصولات با قابلیت ردیابی لحظه‌ای</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div className='w-full h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-blue-300'></div>
                </motion.div>

                {/* Third Card - Features and Chart */}
                <motion.div variants={itemVariants}>
                    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <Title className="text-2xl font-bold text-gray-900">تحلیل عملکرد محصولات</Title>
                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">تحلیل رقابتی</h3>
                                        <p className="text-gray-700 leading-relaxed">مقایسه عملکرد محصولات و شناسایی نقاط قوت و ضعف با استفاده از داده‌های بازار</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">بهینه‌سازی قیمت‌گذاری</h3>
                                        <p className="text-gray-700 leading-relaxed">تعیین قیمت بهینه بر اساس تحلیل بازار، هزینه‌ها و رفتار مشتریان</p>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h3 className="font-semibold text-xl mb-3 text-blue-900">پیش‌بینی تقاضا</h3>
                                        <p className="text-gray-700 leading-relaxed">تخمین دقیق تقاضای آینده برای برنامه‌ریزی تولید با استفاده از هوش مصنوعی</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <Title className="text-2xl font-bold text-gray-900 mb-6">محصولات پرفروش</Title>
                                <div className="h-80">
                                    <BarList
                                        data={topProducts.map(item => ({
                                            name: item.name,
                                            value: item.value,
                                            color: "#3B82F6"
                                        }))}
                                        showAnimation={true}
                                        valueFormatter={(value: number) => `${value.toLocaleString()} عدد`}
                                        className="mt-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
