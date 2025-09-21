import { useState, useEffect } from 'react';

const UserDashboard = () => {
    const [userProgress, setUserProgress] = useState({
        completedCourses: 0,
        totalCourses: 0,
        completedLessons: 0,
        totalLessons: 0,
        overallProgress: 0
    });

    const [courses, setCourses] = useState([]);
    const [recentLessons, setRecentLessons] = useState([]);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        
        // Fetch user data, courses, and progress
        fetchUserDashboardData();
    }, []);

    const fetchUserDashboardData = async () => {
        // Mock data - replace with actual API calls
        const mockCourses = [
            {
                id: 1,
                title: "React Fundamentals",
                progress: 75,
                totalLessons: 12,
                completedLessons: 9,
                thumbnail: "/images/react-course.jpg"
            },
            {
                id: 2,
                title: "JavaScript Advanced",
                progress: 45,
                totalLessons: 15,
                completedLessons: 7,
                thumbnail: "/images/js-course.jpg"
            },
            {
                id: 3,
                title: "Node.js Backend",
                progress: 20,
                totalLessons: 20,
                completedLessons: 4,
                thumbnail: "/images/nodejs-course.jpg"
            }
        ];

        const mockRecentLessons = [
            { id: 1, title: "Component State Management", course: "React Fundamentals", completed: true },
            { id: 2, title: "Event Handling", course: "React Fundamentals", completed: true },
            { id: 3, title: "Async/Await Patterns", course: "JavaScript Advanced", completed: false }
        ];

        setCourses(mockCourses);
        setRecentLessons(mockRecentLessons);
        setUserProgress({
            completedCourses: 1,
            totalCourses: 3,
            completedLessons: 20,
            totalLessons: 47,
            overallProgress: 43
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Dashboard</h1>
                <p className="text-gray-600">Welcome back! Continue your learning journey.</p>
            </header>

            {/* Progress Overview */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Overall Progress</h3>
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold text-blue-600">{userProgress.overallProgress}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Courses Completed</h3>
                        <span className="text-3xl font-bold text-green-600">
                            {userProgress.completedCourses}/{userProgress.totalCourses}
                        </span>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Lessons Completed</h3>
                        <span className="text-3xl font-bold text-purple-600">
                            {userProgress.completedLessons}/{userProgress.totalLessons}
                        </span>
                    </div>
                </div>
            </section>

            {/* My Courses */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.title}</h3>
                                <div className="mb-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{course.progress}% complete</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">
                                    {course.completedLessons}/{course.totalLessons} lessons
                                </p>
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Lessons */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Lessons</h2>
                <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                    {recentLessons.map(lesson => (
                        <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                        lesson.completed 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {lesson.completed ? '✓' : '○'}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">{lesson.title}</h4>
                                    <p className="text-sm text-gray-500">{lesson.course}</p>
                                </div>
                            </div>
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium">
                                {lesson.completed ? 'Review' : 'Continue'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium border">
                        Browse All Courses
                    </button>
                    <button className="bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium border">
                        View Certificates
                    </button>
                    <button className="bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium border">
                        Study Schedule
                    </button>
                    <button className="bg-white text-gray-700 py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium border">
                        Discussion Forum
                    </button>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;