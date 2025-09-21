import React, { useState } from 'react';

const Register = () => {
    const [userType, setUserType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Student specific fields
        dateOfBirth: '',
        grade: '',
        school: '',
        parentName: '',
        parentPhone: '',
        address: '',
        subjects: '',
        goals: '',
        // Coaching specific fields
        instituteName: '',
        experience: '',
        specialization: '',
        phone: '',
        instituteAddress: '',
        website: '',
        establishedYear: '',
        totalStudents: '',
        facilities: '',
        teachingMethods: '',
        successRate: '',
        ownerName: '',
        ownerQualification: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        // Password validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Basic password strength check
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: userType,
                    ...(userType === 'student' && {
                        dateOfBirth: formData.dateOfBirth,
                        grade: formData.grade,
                        school: formData.school,
                        parentName: formData.parentName,
                        parentPhone: formData.parentPhone,
                        address: formData.address,
                        subjects: formData.subjects,
                        goals: formData.goals
                    }),
                    ...(userType === 'coaching' && {
                        instituteName: formData.instituteName,
                        experience: formData.experience,
                        specialization: formData.specialization,
                        phone: formData.phone,
                        instituteAddress: formData.instituteAddress,
                        website: formData.website,
                        establishedYear: formData.establishedYear,
                        totalStudents: formData.totalStudents,
                        facilities: formData.facilities,
                        teachingMethods: formData.teachingMethods,
                        successRate: formData.successRate,
                        ownerName: formData.ownerName,
                        ownerQualification: formData.ownerQualification
                    })
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                console.log('Registration successful:', data);
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dateOfBirth: '',
                    grade: '',
                    school: '',
                    parentName: '',
                    parentPhone: '',
                    address: '',
                    subjects: '',
                    goals: '',
                    instituteName: '',
                    experience: '',
                    specialization: '',
                    phone: '',
                    instituteAddress: '',
                    website: '',
                    establishedYear: '',
                    totalStudents: '',
                    facilities: '',
                    teachingMethods: '',
                    successRate: '',
                    ownerName: '',
                    ownerQualification: ''
                });
                setUserType('');
                
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-black text-white p-8 text-center">
                        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
                        <p className="text-gray-300">Join our educational platform today</p>
                    </div>

                    <div className="p-8">
                        {/* User Type Selection */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                                Choose Your Account Type
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setUserType('student')}
                                    className={`group relative p-6 border-2 rounded-xl font-semibold transition-all duration-300 ${
                                        userType === 'student' 
                                            ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                                            : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🎓</div>
                                        <div>Student</div>
                                        <div className="text-sm mt-1 opacity-70">
                                            Learn and grow with courses
                                        </div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('coaching')}
                                    className={`group relative p-6 border-2 rounded-xl font-semibold transition-all duration-300 ${
                                        userType === 'coaching' 
                                            ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                                            : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🏫</div>
                                        <div>Coaching Center</div>
                                        <div className="text-sm mt-1 opacity-70">
                                            Teach and manage students
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Error and Success Messages */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div className="flex">
                                    <div className="text-red-500 text-xl mr-3">⚠️</div>
                                    <div className="text-red-700 font-medium">{error}</div>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                                <div className="flex">
                                    <div className="text-green-500 text-xl mr-3">✅</div>
                                    <div className="text-green-700 font-medium">
                                        Registration successful! Redirecting to dashboard...
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Registration Form */}
                        {userType && (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Information Section */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                        Basic Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            required
                                            minLength={2}
                                        />
                                        
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            required
                                        />
                                        
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password (min 6 characters)"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            required
                                            minLength={6}
                                        />
                                        
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                {/* Student Specific Information */}
                                {userType === 'student' && (
                                    <>
                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                                Student Details
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <select
                                                    name="grade"
                                                    value={formData.grade}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                >
                                                    <option value="">Select Grade/Class</option>
                                                    <option value="9">Class 9</option>
                                                    <option value="10">Class 10</option>
                                                    <option value="11">Class 11</option>
                                                    <option value="12">Class 12</option>
                                                    <option value="graduate">Graduate</option>
                                                    <option value="postgraduate">Post Graduate</option>
                                                </select>
                                                
                                                <input
                                                    type="text"
                                                    name="school"
                                                    placeholder="Current School/College"
                                                    value={formData.school}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <input
                                                    type="text"
                                                    name="subjects"
                                                    placeholder="Interested Subjects (e.g., Math, Science, English)"
                                                    value={formData.subjects}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="bg-green-50 p-6 rounded-lg">
                                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                                Parent/Guardian Information
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="parentName"
                                                    placeholder="Parent/Guardian Name"
                                                    value={formData.parentName}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <input
                                                    type="tel"
                                                    name="parentPhone"
                                                    placeholder="Parent/Guardian Phone"
                                                    value={formData.parentPhone}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="mt-4 space-y-4">
                                                <textarea
                                                    name="address"
                                                    placeholder="Home Address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                                    required
                                                />
                                                
                                                <textarea
                                                    name="goals"
                                                    placeholder="Academic Goals (e.g., JEE Main, NEET, Board Exams)"
                                                    value={formData.goals}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Coaching Specific Information */}
                                {userType === 'coaching' && (
                                    <>
                                        <div className="bg-purple-50 p-6 rounded-lg">
                                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                                Institute Information
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="instituteName"
                                                    placeholder="Institute/Coaching Name"
                                                    value={formData.instituteName}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Institute Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <input
                                                    type="url"
                                                    name="website"
                                                    placeholder="Website URL (optional)"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                />
                                                
                                                <input
                                                    type="number"
                                                    name="establishedYear"
                                                    placeholder="Established Year"
                                                    value={formData.establishedYear}
                                                    onChange={handleInputChange}
                                                    min="1900"
                                                    max="2024"
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <select
                                                    name="totalStudents"
                                                    value={formData.totalStudents}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                >
                                                    <option value="">Total Students</option>
                                                    <option value="1-50">1-50 students</option>
                                                    <option value="51-100">51-100 students</option>
                                                    <option value="101-300">101-300 students</option>
                                                    <option value="301-500">301-500 students</option>
                                                    <option value="500+">500+ students</option>
                                                </select>
                                                
                                                <input
                                                    type="text"
                                                    name="specialization"
                                                    placeholder="Specialization (e.g., JEE, NEET, Board Exams)"
                                                    value={formData.specialization}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="mt-4">
                                                <textarea
                                                    name="instituteAddress"
                                                    placeholder="Institute Address"
                                                    value={formData.instituteAddress}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="bg-orange-50 p-6 rounded-lg">
                                            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                                                Owner/Director Information
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="ownerName"
                                                    placeholder="Owner/Director Name"
                                                    value={formData.ownerName}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <input
                                                    type="text"
                                                    name="ownerQualification"
                                                    placeholder="Owner Qualification"
                                                    value={formData.ownerQualification}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                />
                                                
                                                <select
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    required
                                                >
                                                    <option value="">Years of Experience</option>
                                                    <option value="1-2">1-2 years</option>
                                                    <option value="3-5">3-5 years</option>
                                                    <option value="6-10">6-10 years</option>
                                                    <option value="10+">10+ years</option>
                                                </select>
                                                
                                                <input
                                                    type="text"
                                                    name="successRate"
                                                    placeholder="Success Rate % (optional)"
                                                    value={formData.successRate}
                                                    onChange={handleInputChange}
                                                    className="p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                />
                                            </div>
                                            
                                            <div className="mt-4 space-y-4">
                                                <textarea
                                                    name="facilities"
                                                    placeholder="Institute Facilities (e.g., Library, Lab, Online Classes)"
                                                    value={formData.facilities}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                                    required
                                                />
                                                
                                                <textarea
                                                    name="teachingMethods"
                                                    placeholder="Teaching Methods & Approach"
                                                    value={formData.teachingMethods}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Creating Account...
                                        </div>
                                    ) : (
                                        `Create ${userType === 'student' ? 'Student' : 'Coaching'} Account`
                                    )}
                                </button>
                            </form>
                        )}
                        
                        {/* Footer */}
                        <div className="text-center mt-8 pt-6 border-t border-gray-200">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <a 
                                    href="/login" 
                                    className="font-semibold text-black hover:underline transition-all duration-300"
                                >
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;