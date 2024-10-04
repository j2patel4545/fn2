import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './logo.png'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Hide header on scroll down, show on scroll up
        if (scrollY > lastScrollY) {
            setIsHeaderVisible(false);
        } else {
            setIsHeaderVisible(true);
        }

        setLastScrollY(scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div>
            {/* Header with conditional visibility */}
            <motion.header
                className="fixed inset-x-0 top-0  bg-black/50 z-10 py-8 xl:py-12 transition-transform duration-300"
                style={{ transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)' }}
            >
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-shrink-0">
                            <a href="#" title="BakerStreet" className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-secondary focus:ring-primary">
                                <img className="w-auto h-14" src={logo} alt="BakerStreet" />
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="p-2 -m-2 transition-all duration-200 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary"
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex md:items-center md:space-x-10 lg:ml-28">
                            <a href="#" className="font-sans text-base font-normal text-white transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary">About</a>
                            <a href="#" className="font-sans text-base font-normal text-white transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary">Services</a>
                            <a href="#" className="font-sans text-base font-normal text-white transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary">Contacts</a>
                        </nav>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-20 bg-gray-800 bg-opacity-80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleCloseMenu} // Close on backdrop click
                    >
                        <motion.div
                            className="absolute left-0 top-0 h-full w-2/3 bg-white p-6 shadow-lg rounded-tr-lg rounded-br-lg"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
                        >
                            <button onClick={handleCloseMenu} className="absolute top-4 right-4 text-gray-800">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <nav className="mt-16 space-y-6">
                                <a href="#" className="block text-gray-800 text-2xl hover:text-gray-600 transition duration-200" onClick={handleCloseMenu}>About</a>
                                <a href="#" className="block text-gray-800 text-2xl hover:text-gray-600 transition duration-200" onClick={handleCloseMenu}>Services</a>
                                <a href="#" className="block text-gray-800 text-2xl hover:text-gray-600 transition duration-200" onClick={handleCloseMenu}>Contacts</a>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Header;
