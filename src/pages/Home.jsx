const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-6 text-black">
                        Welcome to the Future of Learning
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover innovative educational tools and resources designed to enhance your learning experience.
                    </p>
                    <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 shadow-lg">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-black">10K+</h3>
                            <p className="text-gray-600">Active Students</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-black">500+</h3>
                            <p className="text-gray-600">Courses</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-black">100+</h3>
                            <p className="text-gray-600">Expert Instructors</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-black">98%</h3>
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-black">Key Features</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg text-center shadow-md border border-gray-300">
                            <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">📚</span>
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-black">Interactive Learning</h4>
                            <p className="text-gray-600">Engage with dynamic content and interactive exercises.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-center shadow-md border border-gray-300">
                            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">⚡</span>
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-black">Fast Performance</h4>
                            <p className="text-gray-600">Lightning-fast loading times for seamless learning.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg text-center shadow-md border border-gray-300">
                            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">🎯</span>
                            </div>
                            <h4 className="text-xl font-semibold mb-2 text-black">Personalized</h4>
                            <p className="text-gray-600">Tailored learning paths adapted to your needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-black">Course Categories</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300 cursor-pointer">
                            <div className="text-4xl mb-4">💻</div>
                            <h4 className="text-lg font-semibold text-black">Programming</h4>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300 cursor-pointer">
                            <div className="text-4xl mb-4">🎨</div>
                            <h4 className="text-lg font-semibold text-black">Design</h4>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300 cursor-pointer">
                            <div className="text-4xl mb-4">📊</div>
                            <h4 className="text-lg font-semibold text-black">Data Science</h4>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg text-center hover:bg-gray-200 transition duration-300 cursor-pointer">
                            <div className="text-4xl mb-4">💼</div>
                            <h4 className="text-lg font-semibold text-black">Business</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-black">Popular Courses</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6">
                                <h4 className="text-xl font-semibold mb-2 text-black">React Fundamentals</h4>
                                <p className="text-gray-600 mb-4">Learn the basics of React development</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-black">$49</span>
                                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300">
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6">
                                <h4 className="text-xl font-semibold mb-2 text-black">Python for Beginners</h4>
                                <p className="text-gray-600 mb-4">Master Python programming from scratch</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-black">$59</span>
                                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300">
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6">
                                <h4 className="text-xl font-semibold mb-2 text-black">UI/UX Design</h4>
                                <p className="text-gray-600 mb-4">Create beautiful user interfaces</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-black">$79</span>
                                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300">
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-black">What Our Students Say</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <p className="text-gray-700 mb-4 italic">"The courses here are exceptional. I learned more in 3 months than I did in years of self-study."</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                                <div>
                                    <h5 className="font-semibold text-black">Sarah Johnson</h5>
                                    <p className="text-gray-600 text-sm">Software Developer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <p className="text-gray-700 mb-4 italic">"Amazing platform with top-notch instructors. Highly recommend to anyone serious about learning."</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                                <div>
                                    <h5 className="font-semibold text-black">Mike Chen</h5>
                                    <p className="text-gray-600 text-sm">Data Analyst</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4 text-white">Ready to Start Learning?</h3>
                    <p className="text-xl text-gray-300 mb-8">Join thousands of students and transform your career today.</p>
                    <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-lg">
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">&copy; 2024 EdTech Portal. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
