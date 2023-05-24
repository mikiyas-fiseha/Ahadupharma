import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [
    {
        page: 'Medicine',
        links: [
            { label: 'Vitamins and Supplements', icon: <FaCreditCard />, url: '/sub-products/6466aa6ef8d9f6639df14d61' },
            { label: 'Pain Relief', icon: <FaCreditCard />, url: '/sub-products/6466aaa3f8d9f6639df14d6d' },
            { label: 'Allergy and Sinus', icon: <FaCreditCard />, url: '/sub-products/6466aacbf8d9f6639df14d73' },
            { label: 'Digestive Health', icon: <FaCreditCard />, url: '/sub-products/6466aae1f8d9f6639df14d7b' },
            { label: 'Cold and Flu', icon: <FaCreditCard />, url: '/sub-products/6466aafaf8d9f6639df14d81' },
            { label: 'Eye and Ear Care', icon: <FaCreditCard />, url: '/sub-products/6466ab13f8d9f6639df14d87' },
            { label: 'First Aid Supplies', icon: <FaCreditCard />, url: '/sub-products/6466ab2ef8d9f6639df14d91' },
            { label: 'Diabetes Care', icon: <FaCreditCard />, url: '/sub-products/6466ab3bf8d9f6639df14d99' },
            { label: 'Respiratory Health', icon: <FaCreditCard />, url: '/sub-products/6466ab68f8d9f6639df14da1' },
            { label: 'Sleep and Relaxation', icon: <FaCreditCard />, url: '/sub-products/6466ab89f8d9f6639df14da9' },
         
       ],
    },
    {
        page: 'Personal Care',
        links: [
            { label: 'plugiins', icon: <FaBook />, url: '/products' },
            { label: 'libraries', icon: <FaBook />, url: '/products' },
            { label: 'help', icon: <FaBook />, url: '/products' },
            { label: 'billing', icon: <FaBook />, url: '/products' },
            { label: 'plugins', icon: <FaBook />, url: '/products' },
            { label: 'libraries', icon: <FaBook />, url: '/products' },
            { label: 'help', icon: <FaBook />, url: '/products' },
            { label: 'billing', icon: <FaBook />, url: '/products' },
        ],
    },
    {
        page: 'Baby and Child Care',
        links: [
            { label: 'about', icon: <FaBriefcase />, url: '/products' },
            { label: 'customers', icon: <FaBriefcase />, url: '/products' },
        ],
    },
    {
        page: 'Health and Wellness',
        links: [
            { label: 'about', icon: <FaBriefcase />, url: '/products' },
            { label: 'customers', icon: <FaBriefcase />, url: '/products' },
        ],
    },
];

export default sublinks;
