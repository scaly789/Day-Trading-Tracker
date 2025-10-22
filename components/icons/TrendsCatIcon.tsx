import React from 'react';

const TrendsCatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Body */}
    <ellipse cx="50" cy="70" rx="25" ry="20" fill="#E2E8F0" stroke="#4A5568" strokeWidth="3" />
    
    {/* Head */}
    <circle cx="50" cy="45" r="22" fill="#F7FAFC" stroke="#4A5568" strokeWidth="3" />
    
    {/* Ears */}
    <path d="M 35 30 Q 30 15 45 25 Z" fill="#F7FAFC" stroke="#4A5568" strokeWidth="3" strokeLinejoin="round" />
    <path d="M 65 30 Q 70 15 55 25 Z" fill="#F7FAFC" stroke="#4A5568" strokeWidth="3" strokeLinejoin="round" />
    <path d="M 38 29 Q 35 20 45 26 Z" fill="#E2E8F0" />
    <path d="M 62 29 Q 65 20 55 26 Z" fill="#E2E8F0" />
    
    {/* Eyes (content) */}
    <path d="M 40 45 C 42 40, 48 40, 50 45" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" />
    <path d="M 60 45 C 58 40, 52 40, 50 45" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" />
    
    {/* Nose & Mouth */}
    <path d="M 48 52 L 52 52 L 50 55 Z" fill="#FFB6C1" />
    <path d="M 50 55 Q 47 58 44 55" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 50 55 Q 53 58 56 55" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Paws */}
    <circle cx="35" cy="80" r="5" fill="#F7FAFC" stroke="#4A5568" strokeWidth="1.5" />
    <circle cx="65" cy="80" r="5" fill="#F7FAFC" stroke="#4A5568" strokeWidth="1.5" />
    
    {/* Tail */}
    <path d="M 75 70 Q 85 50 70 40" fill="none" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
    <path d="M 75 70 Q 85 50 70 40" fill="none" stroke="#4A5568" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default TrendsCatIcon;
