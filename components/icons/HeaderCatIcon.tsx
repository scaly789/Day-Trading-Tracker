import React from 'react';

const HeaderCatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Head */}
    <circle cx="50" cy="55" r="30" fill="#FFFFFF" stroke="#4A5568" strokeWidth="3" />
    
    {/* Ears */}
    <path d="M 30 35 Q 25 20 40 25 Z" fill="#FFFFFF" stroke="#4A5568" strokeWidth="3" strokeLinejoin="round" />
    <path d="M 70 35 Q 75 20 60 25 Z" fill="#FFFFFF" stroke="#4A5568" strokeWidth="3" strokeLinejoin="round" />
    <path d="M 32 34 Q 30 25 40 26 Z" fill="#FFD1DC" />
    <path d="M 68 34 Q 70 25 60 26 Z" fill="#FFD1DC" />
    
    {/* Patches */}
    <path d="M 65 30 A 15 15 0 0 1 75 55" fill="#FFDAB9" />
    <path d="M 30 30 A 15 15 0 0 0 20 50" fill="#A0AEC0" />
    
    {/* Eyes */}
    <circle cx="42" cy="55" r="3" fill="#4A5568" />
    <circle cx="58" cy="55" r="3" fill="#4A5568" />
    
    {/* Nose & Mouth */}
    <path d="M 48 62 L 52 62 L 50 65 Z" fill="#FFB6C1" />
    <path d="M 50 65 Q 45 70 42 65" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 50 65 Q 55 70 58 65" fill="none" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Whiskers */}
    <path d="M 30 55 L 20 53" stroke="#4A5568" strokeWidth="1" strokeLinecap="round" />
    <path d="M 30 60 L 20 60" stroke="#4A5568" strokeWidth="1" strokeLinecap="round" />
    <path d="M 70 55 L 80 53" stroke="#4A5568" strokeWidth="1" strokeLinecap="round" />
    <path d="M 70 60 L 80 60" stroke="#4A5568" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export default HeaderCatIcon;
