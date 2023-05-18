import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [
    {
        page: 'Medicine',
        links: [
            { label: 'Vitamins and Supplements', icon: <FaCreditCard />, url: '/sub-products/advimedicale' },
            { label: 'Pain Relief', icon: <FaCreditCard />, url: '/sub-products/PainRelief' },
            { label: 'Allergy and Sinus', icon: <FaCreditCard />, url: '/sub-products/AllergyandSinus' },
            { label: 'Digestive Health', icon: <FaCreditCard />, url: '/products' },
            { label: 'Cold and Flu', icon: <FaCreditCard />, url: '/products' },
            { label: 'Eye and Ear Care', icon: <FaCreditCard />, url: '/products' },
            { label: 'First Aid Supplies', icon: <FaCreditCard />, url: '/products' },
            { label: 'Diabetes Care', icon: <FaCreditCard />, url: '/products' },
            { label: 'Respiratory Health', icon: <FaCreditCard />, url: '/products' },
            { label: 'Sleep and Relaxation', icon: <FaCreditCard />, url: '/products' },
         
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
