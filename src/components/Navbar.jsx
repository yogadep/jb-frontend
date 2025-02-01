import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiMenu4Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from '../assets/commentor.png';
import { useLogoutMutation } from '../redux/features/auth/authApi';
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineAddchart } from "react-icons/md";
import logoImg from "../../src/assets/jibo.jpg"
import { handleLogout } from '../utility/handleLogout';
import { motion } from 'framer-motion'

const productCategories = [
    { name: 'Semua Produk', path: '/products' },
    { name: 'Wedding', path: '/products/wedding' },
    { name: 'Graduation', path: '/products/graduation' },
    { name: 'Maternity', path: '/products/maternity' },
    { name: 'Pre-Wedding', path: '/products/prewededding' },
    { name: 'Studio', path: '/products/studio' },
    { name: 'Other', path: '/products/other' },
];

const navLists = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/products' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Company', path: '/company' },
    { name: 'Contact Us', path: '/contact-us' },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const { user, admin } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [logoutMutation] = useLogoutMutation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(!isDesktopMenuOpen);
    const toggleProductDropdown = () => setIsProductDropdownOpen(!isProductDropdownOpen);

    const LogoutClick = () => {
        handleLogout(logoutMutation, dispatch);
    };

    return (
        <header className="py-2 sm:h-14 h-12 m-2">
            <nav className="container mx-auto px-2 sm:px-4 flex items-center justify-start max-w-[1920px] xl:gap-10 md:gap-0.5">
                {/* Logo */}
                <Link to="/" className="w-28 sm:w-32 md:w-44">
                    <img src={logoImg} alt="Logo" className="h-8 sm:h-10" />
                </Link>

                {/* Authentication and Dashboard Buttons */}
                <div className="hidden lg:flex items-center lg:gap-4">
                    {!user && !admin && (
                        <NavLink
                            to="/login"
                            title="Login"
                            className={({ isActive }) =>
                                `flex justify-center items-center gap-2 py-2 px-4 rounded-md shadow-md transition duration-200 ${isActive
                                    ? "bg-transparent text-white hover:text-slate-600"
                                    : "bg-transparent text-white hover:text-slate-600"
                                }`
                            }
                        >
                            <HiOutlineLogin className="text-2xl" />
                        </NavLink>
                    )}
                    {user && (
                        <button
                            onClick={LogoutClick}
                            title="Logout"
                            className="bg-transparent hover:text-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2"
                        >
                            <HiOutlineLogout className="text-2xl" />
                        </button>
                    )}
                    {admin && (
                        <Link to="/dashboard" title="Dashboard">
                            <button className="bg-transparent hover:ring-2 ring-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2">
                                <MdOutlineAddchart className="text-2xl" />
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMobileMenu} className="lg:hidden xl:hidden text-white text-xl sm:text-2xl md:text-3xl cursor-pointer z-50">
                    {isMobileMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                </button>

                {/* Desktop Menu Toggle */}
                <div className="flex text-white xl:justify-start lg:justify-start items-center">
                    <button onClick={toggleDesktopMenu} className="hidden xl:block lg:block text-white text-xl font-bold cursor-pointer">
                        {isDesktopMenuOpen ? <IoClose /> : <RiMenu4Fill />}
                    </button>
                    <div className="tracking-widest font-bold xl:block lg:block hidden lg:ml-20 xl:ml-48  sm:text-sm">
                        Capture Every Moment of Happiness at Jibo Unlimited
                    </div>
                </div>

                {/* Desktop Menu with Product Dropdown */}
                <div className={`hidden xl:block lg:block bg-white absolute duration-500 ${isDesktopMenuOpen ? "top-1" : "-top-full"} left-[30%] shadow-md`}>
                    <div className="flex items-center justify-center p-2.5 lg:space-x-14 md:space-x-10 xl:space-x-16 font-bold">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "px-3 xl:px-5 py-2 text-gray-900 hover:text-gray-300 transition"
                                    : "px-3 xl:px-5 py-2 text-red-800 hover:text-gray-300 transition"
                            }
                        >
                            Home
                        </NavLink>

                        {/* Product Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProductDropdown}
                                className="px-3 xl:px-5 py-2 text-red-800 hover:text-gray-300 transition"
                            >
                                Product
                            </button>
                            {isProductDropdownOpen && (
                                <motion.div
                                    className="absolute -left-6 sm:mt-2 lg:mt-4 w-44 bg-white rounded-xl shadow-lg z-50"
                                    initial={{ opacity: 0, y: -200 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    {productCategories.map((category, index) => (
                                        <Link
                                            key={index}
                                            to={category.path}
                                            className="block px-7 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl"
                                            onClick={() => setIsProductDropdownOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <NavLink
                            to="/about-us"
                            className={({ isActive }) =>
                                isActive
                                    ? "px-3 xl:px-5 py-2 text-gray-900 hover:text-gray-300 transition"
                                    : "px-3 xl:px-5 py-2 text-red-800 hover:text-gray-300 transition"
                            }
                        >
                            About Us
                        </NavLink>

                        <NavLink
                            to="/company"
                            className={({ isActive }) =>
                                isActive
                                    ? "px-3 xl:px-5 py-2 text-gray-900 hover:text-gray-300 transition"
                                    : "px-3 xl:px-5 py-2 text-red-800 hover:text-gray-300 transition"
                            }
                        >
                            Company
                        </NavLink>

                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                isActive
                                    ? "px-3 xl:px-5 py-2 text-gray-900 hover:text-gray-300 transition"
                                    : "px-3 xl:px-5 py-2 text-red-800 hover:text-gray-300 transition"
                            }
                        >
                            Contact Us
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Menu with Product Dropdown */}
                <div
                    className={`lg:hidden bg-white fixed top-[4.5rem] left-0 h-screen w-64 sm:w-52 md:w-64 transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } z-50 pointer-events-auto opacity-100`}
                >
                    <ul className="flex flex-col gap-3 my-2">
                        <li>
                            <NavLink
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-4 py-3 text-gray-900 font-bold bg-gray-200 rounded-md'
                                        : 'block px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md'
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        {/* Product Dropdown in Mobile Menu */}
                        <li>
                            <button
                                onClick={toggleProductDropdown}
                                className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md"
                            >
                                Product
                            </button>
                            {isProductDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    className="ml-3"
                                >
                                    {productCategories.map((category, index) => (
                                        <Link
                                            key={index}
                                            to={category.path}
                                            className="block px-4 py-2 font-semibold text-gray-900 hover:bg-gray-200"
                                            onClick={() => {
                                                setIsProductDropdownOpen(false);
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </li>

                        <li>
                            <NavLink
                                to="/about-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-4 py-3 text-gray-900 font-bold bg-gray-200 rounded-md'
                                        : 'block px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md'
                                }
                            >
                                About Us
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/company"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-4 py-3 text-gray-900 font-bold bg-gray-200 rounded-md'
                                        : 'block px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md'
                                }
                            >
                                Company
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/contact-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block px-4 py-3 text-gray-900 font-bold bg-gray-200 rounded-md'
                                        : 'block px-4 py-3 text-gray-600 hover:bg-gray-100 transition rounded-md'
                                }
                            >
                                Contact Us
                            </NavLink>
                        </li>

                        {!user && !admin && (
                            <li className="">
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-gray-600 font-bold hover:bg-gray-100 transition rounded-md"
                                >
                                    <HiOutlineLogin className="text-1xl sm:text-xl inline mr-2" /> Login
                                </NavLink>
                            </li>
                        )}

                        {admin && (
                            <li className="flex items-center gap-3 px-4 py-3">
                                {/* <img
                                    src={avatarImg}
                                    alt="Admin Avatar"
                                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                                /> */}
                                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2">
                                        <MdOutlineAddchart className="text-1xl" /> Dashboard
                                    </button>
                                </Link>
                            </li>
                        )}

                        {user && !admin && (
                            <li className="flex items-center gap-3 px-4 py-3">
                                {/* <img
                                    src={avatarImg}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                                /> */}
                                <button
                                    onClick={() => {
                                        LogoutClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 flex items-center gap-2"
                                >
                                    <HiOutlineLogout className="text-1xl" /> Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header >
    );
};

export default Navbar;