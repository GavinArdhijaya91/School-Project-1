import React, { useState, useEffect } from 'react';

const TypeWriter = ({ scenes, className = '' }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const currentScene = scenes[currentSceneIndex];
        let timeout;

        if (isTyping) {
            if (displayText.length < currentScene.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentScene.slice(0, displayText.length + 1));
                }, 70); 
            } else {
             
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40); 
            } else {
               
                setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, currentSceneIndex, scenes]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className={className}>
            {displayText}
            <span className={`cursor ${showCursor ? 'cursor-visible' : 'cursor-hidden'}`}>|</span>
        </span>
    );
};

export default TypeWriter;
