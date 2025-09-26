import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Users, CheckCircle, XCircle } from 'lucide-react';

const EnrollmentButton = ({ 
    courseId, 
    isEnrolled, 
    onEnrollmentChange, 
    price = 0,
    capacity,
    currentEnrollments = 0,
    enrollmentDeadline,
    prerequisites = [],
    userCompletedPrereqs = [],
    disabled = false
}) => {
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [timeLeft, setTimeLeft] = useState('');

    // Check if enrollment deadline is approaching
    useEffect(() => {
        if (enrollmentDeadline) {
            const updateTimeLeft = () => {
                const now = new Date();
                const deadline = new Date(enrollmentDeadline);
                const diff = deadline - now;
                
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    
                    if (days > 0) {
                        setTimeLeft(`${days} day(s) left`);
                    } else if (hours > 0) {
                        setTimeLeft(`${hours} hour(s) left`);
                    } else {
                        setTimeLeft('Less than 1 hour left');
                    }
                } else {
                    setTimeLeft('Enrollment closed');
                }
            };

            updateTimeLeft();
            const interval = setInterval(updateTimeLeft, 60000);
            return () => clearInterval(interval);
        }
    }, [enrollmentDeadline]);

    const isCapacityFull = capacity && currentEnrollments >= capacity;
    const hasUnmetPrereqs = prerequisites.length > 0 && 
        !prerequisites.every(prereq => userCompletedPrereqs.includes(prereq));
    const isDeadlinePassed = enrollmentDeadline && new Date() > new Date(enrollmentDeadline);

    const canEnroll = !isEnrolled && !isCapacityFull && !hasUnmetPrereqs && !isDeadlinePassed && !disabled;
    const canUnenroll = isEnrolled && !disabled;

    const handleEnrollment = async () => {
        if (isEnrolled && !showConfirmation) {
            setShowConfirmation(true);
            return;
        }

        setLoading(true);
        setEnrollmentStatus('');

        try {
            const endpoint = isEnrolled ? 'unenroll' : 'enroll';
            const response = await fetch(`/api/courses/${courseId}/${endpoint}`, {
                method: isEnrolled ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                onEnrollmentChange(!isEnrolled);
                setEnrollmentStatus(isEnrolled ? 'Successfully unenrolled!' : 'Successfully enrolled!');
                setShowConfirmation(false);
                
                setTimeout(() => setEnrollmentStatus(''), 3000);
            } else {
                setEnrollmentStatus(data.message || 'Enrollment failed. Please try again.');
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            setEnrollmentStatus('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const getButtonText = () => {
        if (loading) return 'Processing...';
        if (showConfirmation) return 'Confirm Unenroll';
        if (isEnrolled) return 'Unenroll';
        if (isCapacityFull) return 'Course Full';
        if (isDeadlinePassed) return 'Enrollment Closed';
        if (hasUnmetPrereqs) return 'Prerequisites Required';
        return price > 0 ? `Enroll Now - $${price}` : 'Enroll Now';
    };

    const getButtonClasses = () => {
        const baseClasses = 'w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2';
        
        if (loading) {
            return `${baseClasses} bg-gray-400 text-white cursor-not-allowed`;
        }
        
        if (showConfirmation) {
            return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`;
        }
        
        if (isEnrolled) {
            return `${baseClasses} bg-gray-100 border-2 border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-gray-500`;
        }
        
        if (canEnroll) {
            return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500`;
        }
        
        return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    };

    const capacityPercentage = capacity ? (currentEnrollments / capacity) * 100 : 0;

    return (
        <div className="space-y-4">
            {/* Main Enrollment Button */}
            <button 
                className={getButtonClasses()}
                onClick={handleEnrollment}
                disabled={loading || (!canEnroll && !canUnenroll)}
                title={hasUnmetPrereqs ? `Prerequisites: ${prerequisites.join(', ')}` : ''}
            >
                {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                )}
                {isEnrolled && !loading && <CheckCircle className="w-4 h-4" />}
                {getButtonText()}
            </button>

            {/* Enrollment Status Message */}
            {enrollmentStatus && (
                <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    enrollmentStatus.includes('Success') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                    {enrollmentStatus.includes('Success') ? (
                        <CheckCircle className="w-4 h-4" />
                    ) : (
                        <XCircle className="w-4 h-4" />
                    )}
                    {enrollmentStatus}
                </div>
            )}

            {/* Course Capacity Indicator */}
            {capacity && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Users className="w-4 h-4" />
                            Course Capacity
                        </div>
                        <span className="text-sm text-gray-600">
                            {currentEnrollments} / {capacity} enrolled
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                                capacityPercentage >= 100 ? 'bg-red-500' : 
                                capacityPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Enrollment Deadline */}
            {enrollmentDeadline && timeLeft && (
                <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    timeLeft.includes('closed') || timeLeft.includes('Less than') 
                        ? 'bg-red-50 text-red-800 border border-red-200' 
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                    <Clock className="w-4 h-4" />
                    <span>Enrollment deadline: {timeLeft}</span>
                </div>
            )}

            {/* Prerequisites Warning */}
            {hasUnmetPrereqs && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                            <p className="font-medium text-amber-800">Prerequisites Required</p>
                            <p className="text-amber-700 mt-1">
                                Complete: {prerequisites.filter(p => !userCompletedPrereqs.includes(p)).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Unenrollment</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to unenroll from this course? You may lose your progress and will need to re-enroll to continue.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                onClick={handleEnrollment}
                                disabled={loading}
                            >
                                {loading && (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                )}
                                {loading ? 'Processing...' : 'Confirm Unenroll'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollmentButton;