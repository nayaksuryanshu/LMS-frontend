import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">EdTech Portal</h3>
                        <p className="text-gray-300">
                            Empowering education through technology and innovation.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                            <li><a href="/courses" className="text-gray-300 hover:text-white">Courses</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
                            <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <p className="text-gray-300">Email: info@edtechportal.com</p>
                        <p className="text-gray-300">Phone: (555) 123-4567</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} EdTech Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;