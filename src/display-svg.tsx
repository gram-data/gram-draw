import React from 'react';
import { BorderStyleProperty, ColorProperty } from 'csstype';

const dashArrayForPattern = (pattern:BorderStyleProperty) => {
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
  fill?:ColorProperty;
  strokeWidth?: number;
  strokePattern?: BorderStyleProperty; 
}

export const DisplaySVG: React.FC<DisplaySVGProps> = ({
  size,
  fill = 'green',
  strokeWidth = 2,
  strokePattern = 'dotted',
  children,
}) => {
  return (
    <div style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        viewBox={`-${strokeWidth} -${strokeWidth} ${size +
          strokeWidth * 2} ${size + strokeWidth * 2}`}
        stroke="red"
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
