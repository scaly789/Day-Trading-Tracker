import React from 'react';

// Default Cat - Neutral and content
export const DefaultCat: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement('g', { transform: "translate(0, 5)" },
      // Body
      React.createElement('path', { d: "M 25 90 C 25 70, 75 70, 75 90 Z", fill: "#F7FAFC", stroke: "#4A5568", strokeWidth: "3" }),
      // Paws
      React.createElement('circle', { cx: "40", cy: "88", r: "7", fill: "#FFFFFF", stroke: "#4A5568", strokeWidth: "2.5" }),
      React.createElement('circle', { cx: "60", cy: "88", r: "7", fill: "#FFFFFF", stroke: "#4A5568", strokeWidth: "2.5" }),
      // Head
      React.createElement('circle', { cx: "50", cy: "50", r: "30", fill: "#F7FAFC", stroke: "#4A5568", strokeWidth: "3" }),
      // Ears
      React.createElement('path', { d: "M 30 30 Q 25 15 40 25 Z", fill: "#F7FAFC", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
      React.createElement('path', { d: "M 70 30 Q 75 15 60 25 Z", fill: "#F7FAFC", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
      // Eyes
      React.createElement('circle', { cx: "42", cy: "50", r: "3.5", fill: "#4A5568" }),
      React.createElement('circle', { cx: "58", cy: "50", r: "3.5", fill: "#4A5568" }),
      // Nose & Mouth
      React.createElement('path', { d: "M 48 58 L 52 58 L 50 61 Z", fill: "#FFB6C1" }),
      React.createElement('path', { d: "M 50 61 Q 45 65 42 61", fill: "none", stroke: "#4A5568", strokeWidth: "1.5", strokeLinecap: "round" }),
      React.createElement('path', { d: "M 50 61 Q 55 65 58 61", fill: "none", stroke: "#4A5568", strokeWidth: "1.5", strokeLinecap: "round" })
    )
  )
);


// Rich Cat - Happy with top hat and monocle
export const RichCat: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
     React.createElement('g', { transform: "translate(0, 5)" },
        // Dollar signs
        React.createElement('text', { x: "10", y: "40", fontSize: "20", fill: "#FBBF24", transform: "rotate(-15 10 40)" }, "$"),
        React.createElement('text', { x: "85", y: "50", fontSize: "25", fill: "#FBBF24", transform: "rotate(15 85 50)" }, "$"),
        // Head
        React.createElement('circle', { cx: "50", cy: "50", r: "30", fill: "#FFFFFF", stroke: "#4A5568", strokeWidth: "3" }),
        // Ears
        React.createElement('path', { d: "M 30 30 Q 25 15 40 25 Z", fill: "#FFFFFF", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        React.createElement('path', { d: "M 70 30 Q 75 15 60 25 Z", fill: "#FFFFFF", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        // Eyes (smiling)
        React.createElement('path', { d: "M 38 50 A 5 5 0 0 1 46 50", fill: "none", stroke: "#4A5568", strokeWidth: "2.5", strokeLinecap: "round" }),
        // Monocle
        React.createElement('circle', { cx: "58", cy: "50", r: "8", fill: "none", stroke: "#4A5568", strokeWidth: "2.5" }),
        React.createElement('line', { x1: "66", y1: "50", x2: "72", y2: "40", stroke: "#4A5568", strokeWidth: "2" }),
        // Nose & Mouth (big smile)
        React.createElement('path', { d: "M 48 58 L 52 58 L 50 61 Z", fill: "#FFB6C1" }),
        React.createElement('path', { d: "M 50 61 Q 40 72 35 63", fill: "none", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 50 61 Q 60 72 65 63", fill: "none", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),
        // Top Hat
        React.createElement('rect', { x: "35", y: "5", width: "30", height: "20", fill: "#4A5568", rx: "2" }),
        React.createElement('rect', { x: "30", y: "25", width: "40", height: "5", fill: "#4A5568", rx: "2" })
     )
  )
);


// Sad Cat - A bit down
export const SadCat: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
     React.createElement('g', { transform: "translate(0, 5)" },
        // Head
        React.createElement('circle', { cx: "50", cy: "50", r: "30", fill: "#E2E8F0", stroke: "#4A5568", strokeWidth: "3" }),
        // Ears (droopy)
        React.createElement('path', { d: "M 30 30 Q 20 40 40 35 Z", fill: "#E2E8F0", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        React.createElement('path', { d: "M 70 30 Q 80 40 60 35 Z", fill: "#E2E8F0", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        // Eyes (sad)
        React.createElement('path', { d: "M 38 52 A 5 5 0 0 0 46 52", fill: "none", stroke: "#4A5568", strokeWidth: "2.5", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 54 52 A 5 5 0 0 0 62 52", fill: "none", stroke: "#4A5568", strokeWidth: "2.5", strokeLinecap: "round" }),
        // Tear
        React.createElement('path', { d: "M 60 58 Q 58 65 62 65 Q 64 65 60 58 Z", fill: "#60A5FA" }),
        // Nose & Mouth (frown)
        React.createElement('path', { d: "M 48 60 L 52 60 L 50 63 Z", fill: "#FFB6C1" }),
        React.createElement('path', { d: "M 50 63 Q 45 58 42 63", fill: "none", stroke: "#4A5568", strokeWidth: "1.5", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 50 63 Q 55 58 58 63", fill: "none", stroke: "#4A5568", strokeWidth: "1.5", strokeLinecap: "round" })
     )
  )
);

// Very Sad Cat - Broke, in a box
export const VerySadCat: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    React.createElement('svg', { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
        // Cardboard Box
        React.createElement('path', { d: "M 15 50 L 20 95 L 80 95 L 85 50 Z", fill: "#D2B48C", stroke: "#8B4513", strokeWidth: "3", strokeLinejoin: "round" }),
        React.createElement('line', { x1: "50", y1: "50", x2: "50", y2: "95", stroke: "#8B4513", strokeWidth: "1", strokeDasharray: "4" }),
        React.createElement('path', { d: "M 15 50 L 40 40 L 85 50 L 60 60 Z", fill: "#DEB887", stroke: "#8B4513", strokeWidth: "2", strokeLinejoin: "round" }),

        // Head
        React.createElement('circle', { cx: "50", cy: "45", r: "22", fill: "#CBD5E0", stroke: "#4A5568", strokeWidth: "3" }),
        // Ears (very droopy)
        React.createElement('path', { d: "M 35 30 Q 20 45 40 38 Z", fill: "#CBD5E0", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        React.createElement('path', { d: "M 65 30 Q 80 45 60 38 Z", fill: "#CBD5E0", stroke: "#4A5568", strokeWidth: "3", strokeLinejoin: "round" }),
        
        // Band-aid
        React.createElement('g', { transform: "rotate(-30 35 30)" },
            React.createElement('rect', { x: "28", y: "28", width: "14", height: "6", fill: "#FEE2E2", rx: "2" }),
            React.createElement('rect', { x: "32", y: "29", width: "6", height: "4", fill: "#FECACA" })
        ),

        // Eyes (crying)
        React.createElement('path', { d: "M 40 48 L 45 45", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 45 48 L 40 45", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 55 48 L 60 45", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),
        React.createElement('path', { d: "M 60 48 L 55 45", stroke: "#4A5568", strokeWidth: "2", strokeLinecap: "round" }),

        // Nose & Mouth (wobbly frown)
        React.createElement('path', { d: "M 48 55 L 52 55 L 50 58 Z", fill: "#FFB6C1" }),
        React.createElement('path', { d: "M 42 58 C 45 55, 55 55, 58 58", fill: "none", stroke: "#4A5568", strokeWidth: "1.5", strokeLinecap: "round" })
    )
);
