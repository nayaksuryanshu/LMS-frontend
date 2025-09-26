import React, { useState, useEffect, useCallback } from 'react';

const LessonList = ({ courseId, onLessonSelect }) => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('order');

    const fetchLessons = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/courses/${courseId}/lessons`);
            if (!response.ok) {
                throw new Error('Failed to fetch lessons');
            }
            const data = await response.json();
            setLessons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    const handleLessonClick = (lesson) => {
        if (onLessonSelect) {
            onLessonSelect(lesson);
        }
    };

    const toggleLessonCompletion = async (lessonId, currentStatus) => {
        try {
            const response = await fetch(`/api/lessons/${lessonId}/toggle-completion`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !currentStatus }),
            });
            
            if (response.ok) {
                setLessons(lessons.map(lesson => 
                    lesson.id === lessonId 
                        ? { ...lesson, completed: !lesson.completed }
                        : lesson
                ));
            }
        } catch (err) {
            console.error('Failed to update lesson status:', err);
        }
    };

    const filteredLessons = lessons
        .filter(lesson => {
            const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || 
                                (filter === 'completed' && lesson.completed) ||
                                (filter === 'incomplete' && !lesson.completed);
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'duration':
                    return a.duration - b.duration;
                case 'order':
                default:
                    return a.order - b.order;
            }
        });

    const completedCount = lessons.filter(lesson => lesson.completed).length;
    const progressPercentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading lessons...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 mb-4">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Error: {error}
                </div>
                <button 
                    onClick={fetchLessons} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Lessons</h3>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                        {completedCount}/{lessons.length} completed
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                    <div className="flex mb-2 items-center justify-between">
                        <div className="text-sm font-medium text-blue-700">Progress</div>
                        <div className="text-sm text-blue-600">{Math.round(progressPercentage)}%</div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-blue-100">
                        <div 
                            style={{ width: `${progressPercentage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                        />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search lessons..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="all">All Lessons</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>

                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="order">Default Order</option>
                        <option value="title">Title A-Z</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>
            </div>

            {/* Lessons List */}
            <div className="p-6">
                {filteredLessons.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500">
                            {searchTerm || filter !== 'all' ? 'No lessons match your criteria' : 'No lessons available'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredLessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={`group relative flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                                    lesson.completed 
                                        ? 'bg-green-50 border-green-200 hover:border-green-300' 
                                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                                }`}
                                onClick={() => handleLessonClick(lesson)}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className={`text-lg font-medium ${lesson.completed ? 'text-green-900' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                                                {lesson.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                {lesson.description}
                                            </p>
                                            <div className="flex items-center mt-3 space-x-4">
                                                <span className="inline-flex items-center text-sm text-gray-500">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {lesson.duration} min
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    lesson.completed 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {lesson.completed ? 'Completed' : 'Not Started'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                                        lesson.completed
                                            ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                                            : 'bg-gray-200 text-gray-400 hover:bg-blue-500 hover:text-white'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLessonCompletion(lesson.id, lesson.completed);
                                    }}
                                    title={lesson.completed ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                    {lesson.completed ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <div className="w-3 h-3 rounded-full border-2 border-current"></div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonList;