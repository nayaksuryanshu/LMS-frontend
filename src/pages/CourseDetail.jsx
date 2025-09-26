import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star, Play, DollarSign } from 'lucide-react';
import EnrollmentButton from '../components/common/EnrollmentButton'; // Adjust path as needed
import LessonList from '../components/dashboard/LessonList'; // Add this import

const CourseCard = ({ course, onEnroll, showEnrollButton = true, showLessonList = false }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/courses/${course.id}`);
    };

    const handleEnrollClick = (e) => {
        e.stopPropagation();
        if (onEnroll) {
            onEnroll(course.id);
        }
    };

    const formatPrice = (price) => {
        return price === 0 ? 'Free' : `$${price}`;
    };

    const truncateText = (text, maxLength = 100) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
            onClick={handleCardClick}
        >
            {/* Course Thumbnail */}
            <div className="relative">
                <img 
                    src={course.thumbnail || 'https://via.placeholder.com/400x200'} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.price === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                    }`}>
                        {formatPrice(course.price)}
                    </span>
                </div>
                {course.enrolled && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Enrolled
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Play className="w-12 h-12 text-white" />
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
                {/* Course Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-2">
                    by {course.instructor}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {truncateText(course.description)}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                        </div>
                        <div className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {course.lessons} lessons
                        </div>
                        <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {course.students}
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="flex items-center mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                        star <= Math.floor(course.rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {course.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                            ({course.reviews || 0})
                        </span>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                        {course.originalPrice && course.originalPrice > course.price && (
                            <span className="text-xs text-gray-500 line-through mr-1">
                                ${course.originalPrice}
                            </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                            {formatPrice(course.price)}
                        </span>
                    </div>
                </div>

                {/* Progress Bar (if enrolled) */}
                {course.enrolled && course.progress !== undefined && (
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Lesson List */}
                {showLessonList && course.lessons && (
                    <div className="mb-4">
                        <LessonList lessons={course.lessonList || course.lessons} />
                    </div>
                )}

                {/* Action Button */}
                {showEnrollButton && (
                    <EnrollmentButton
                        course={course}
                        onEnroll={handleEnrollClick}
                    />
                )}

                {/* Course Level Badge */}
                {course.level && (
                    <div className="mt-3 flex justify-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.level === 'Beginner' 
                                ? 'bg-green-100 text-green-800'
                                : course.level === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {course.level}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
