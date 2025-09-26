import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
    progress = 0, 
    total = 100, 
    height = '8px',
    color = '#007bff',
    backgroundColor = '#e9ecef',
    showPercentage = false,
    animated = false,
    striped = false,
    label = '',
    className = ''
}) => {
    const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
    
    const progressBarStyle = {
        width: '100%',
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
    };

    const progressFillStyle = {
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        transition: 'width 0.3s ease',
        borderRadius: '4px'
    };

    const progressBarClasses = [
        'progress-bar',
        animated ? 'progress-bar-animated' : '',
        striped ? 'progress-bar-striped' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="progress-container">
            {label && (
                <div className="progress-label">
                    <span>{label}</span>
                    {showPercentage && (
                        <span className="progress-percentage">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}
            <div style={progressBarStyle} className={progressBarClasses}>
                <div style={progressFillStyle} className="progress-fill">
                    {!label && showPercentage && (
                        <span className="progress-text">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;