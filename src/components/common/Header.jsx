import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserDashboard from '../dashboard/UserDashboard'; // Adjust path as needed

const Header = () => {
    const [isUserDashOpen, setIsUserDashOpen] = useState(false);
    const [isLoggedIn, _setIsLoggedIn] = useState(false); // You'll want to manage this with actual auth state

    return (
        <header className="bg-white text-black shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                     {/* Logo */}
                   <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-black">
                            EdTech Portal
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a 
                            href="#courses" 
                            className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
                        >
                            Courses
                        </a>
                        <Link 
                            to="/about" 
                            className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Auth Buttons / User Dashboard */}
                    <div className="flex items-center space-x-4">
                        {/* Chatbot Icon */}
                        <Link 
                            to="/chatbot"
                            className="text-black hover:text-gray-600 transition-colors duration-200 p-2"
                            title="Chatbot"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>

                        {isLoggedIn ? (
                            <button
                                onClick={() => setIsUserDashOpen(!isUserDashOpen)}
                                className="text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                            >
                                Dashboard
                            </button>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-black">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* User Dashboard Modal/Dropdown */}
            {isUserDashOpen && (
                <div className="absolute top-full right-0 z-50">
                    <UserDashboard onClose={() => setIsUserDashOpen(false)} />
                </div>
            )}
        </header>
    );
};

export default Header;