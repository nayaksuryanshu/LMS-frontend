import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI Career Guidance Counselor. I'm here to help you explore career paths, discuss your goals, and provide guidance on your professional journey. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                text: getBotResponse(inputMessage),
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
            return "Great question about careers! To provide the best guidance, could you tell me more about your interests, skills, or the industry you're considering? I can help you explore various career paths and their requirements.";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
            return "Learning new skills is essential for career growth! What specific skills are you interested in developing? I can suggest learning resources, courses, and career paths where those skills would be valuable.";
        } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return "I'd be happy to help with your resume! Key tips include: highlighting relevant experience, using action verbs, quantifying achievements, and tailoring it to each job. Would you like specific advice for your field?";
        } else if (lowerMessage.includes('interview')) {
            return "Interview preparation is crucial! Practice common questions, research the company, prepare examples using the STAR method, and have questions ready to ask. Would you like me to help you practice for a specific role?";
        } else {
            return "I understand you're looking for career guidance. I can help with career exploration, skill development, resume tips, interview preparation, and professional growth strategies. What specific aspect would you like to discuss?";
        }
    };

    const quickActions = [
        "Explore career paths",
        "Resume tips",
        "Interview preparation",
        "Skill development"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                            <Bot className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">AI Career Counselor</h1>
                            <p className="text-gray-600">Your personal guide to career success</p>
                        </div>
                        <div className="ml-auto">
                            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="bg-white shadow-lg h-96 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            {message.sender === 'bot' && (
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                    message.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <span className="text-xs opacity-75 block mt-1">
                                    {message.timestamp}
                                </span>
                            </div>
                            {message.sender === 'user' && (
                                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-full">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex items-start space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow-lg p-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => setInputMessage(action)}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm transition-colors"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="bg-white rounded-b-2xl shadow-lg p-6">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask me about careers, skills, interviews, or anything else..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={inputMessage.trim() === ''}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;