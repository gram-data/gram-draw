import React from 'react';

import * as CSS from 'csstype';

const dashArrayForPattern = (pattern:CSS.Property.Border) => {
  switch (pattern) {
    case 'dashed':
      return '4,4'
    case 'dotted':
      return '1,4'
    case 'solid':
      return '';
    default:
      return ''
  }
}

interface DisplaySVGProps  {
  size: number; 
  fill?:CSS.Property.Color;
  strokeColor?: CSS.Property.Color;
  strokeWidth?: number;
  strokePattern?: CSS.Property.Border; 
}

export const DisplaySVG: React.FC<DisplaySVGProps> = ({
  size,
  fill = 'green',
  strokeColor = 'gray',
  strokeWidth = 2,
  strokePattern = 'dotted',
  children,
}) => {

  return (
    <div style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        viewBox={`-${strokeWidth} -${strokeWidth} ${size +
          strokeWidth * 2} ${size + strokeWidth * 2}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArrayForPattern(strokePattern)}
        fillOpacity={0.25}
        fill={fill}
      >
        {children}
      </svg>
    </div>
  );
};
