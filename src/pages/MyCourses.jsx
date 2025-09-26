import React, { useState, useEffect } from 'react';
import CourseCard from '../components/common/CourseCard';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('enrolled');

    useEffect(() => {
        // Fetch user's courses
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            // Replace with actual API call
            const response = await fetch('/api/my-courses');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        if (activeTab === 'enrolled') return course.status === 'enrolled';
        if (activeTab === 'completed') return course.status === 'completed';
        if (activeTab === 'wishlist') return course.status === 'wishlist';
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
                    <p className="text-gray-600">Track your learning progress and continue your education journey</p>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <nav className="flex space-x-8">
                        {['enrolled', 'completed', 'wishlist'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab} ({courses.filter(c => c.status === tab).length})
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                showProgress={activeTab === 'enrolled'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No {activeTab} courses
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {activeTab === 'enrolled' && "You haven't enrolled in any courses yet."}
                            {activeTab === 'completed' && "You haven't completed any courses yet."}
                            {activeTab === 'wishlist' && "Your wishlist is empty."}
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Browse Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;