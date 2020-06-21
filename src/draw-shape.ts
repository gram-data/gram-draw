import {indexedPoint, range} from './draw-util';
import {endCapDirection} from './draw-line';

/**
 * Like a circle.
 * 
 * @param radius 
 */
export const dot = (radius = 1) => {
  const r = Math.max(1, radius);
  return `
    m 0, ${-r}
    a ${r} ${r} 0 0 1 0 ${r * 2}
    a ${r} ${r} 0 0 1 0 ${-r * 2}
    m 0, ${r}
    `
};

/**
 * A 'radius' shape draws a line from the center to the circumference of a circle.
 * 
 * @param length 
 * @param spin 
 */
export const radius = (length: number, spin = 0) => {
  const tx = length * Math.cos(spin);
  const ty = length * Math.sin(spin);
  return `l ${tx},${ty} m ${-tx}, ${-ty}`
}

/**
 * A 'diameter' shape is a chord which passes through a circle's center,
 * returning to the center. 
 * 
 * @param radius 
 * @param spin 
 */
export const diameter = (radius: number, spin = 0) => {
  const tx = radius * Math.cos(spin);
  const ty = radius * Math.sin(spin);
  return `m ${-tx},${-ty} l ${tx*2},${ty*2} m ${-tx}, ${-ty}`
}


/**
 * A 'rectangle' shape.
 *
 * @param width
 * @param height
 */
export const rect = (
  width: number,
  height: number
) => {
  return `
  m ${ - width / 2}, ${ - height / 2}
  h ${width}
  v ${height}
  h ${-width}
  z
  m ${ + width/2}, ${ + height / 2}
  `;
};

/**
 * A 'bisegment' is the middle segment of two parallel, horizontally aligned
 * circle chords of equal size.
 *
 * Or, the intersection of a rectangle and a circle that have the same center,
 * where the rectangle width is equal to the circle diameter.
 *
 *
 * @param radius the radius of the bisegmented circle
 * @param height the height of the bisegment
 * @param capDirection the end-cap style: 'outer' | 'inner' | 'left' | 'right'
 * @param x optional x coordinate
 * @param y optional y coordinate
 * @param centered whether x,y coordinates are center or top-left
 */
export const bisegment = (
  radius: number,
  height: number,
  capDirection: endCapDirection = 'outer',
  x = 0,
  y = 0,
  centered = true
) => {
  const centerX = centered ? x : x + radius;
  const centerY = centered ? y : y + height / 2;

  const ty = height / 2;
  const tx = Math.sqrt(Math.pow(radius, 2) - Math.pow(ty, 2));
  const rightSide =
    capDirection === 'outer' || capDirection === 'right'
      ? `a ${radius} ${radius} 0 0 1 0 ${ty * 2}`
      : `a ${radius} ${radius} 0 0 0 0 ${ty * 2}`;
  const leftSide =
    capDirection === 'outer' || capDirection === 'left'
      ? `a ${radius} ${radius} 0 0 1 0 ${-ty * 2}`
      : `a ${radius} ${radius} 0 0 0 0 ${-ty * 2}`;

  return `M ${centerX - tx},${centerY - ty} 
        h ${tx * 2}
        ${rightSide}
        h ${-tx * 2}
        ${leftSide}
        `;
};

/**
 * A 'circle' path is composed of two semicircle segments.
 *
 * @param radius
 * @param spin
 * @param x optional x coordinate
 * @param y optioanl y coordinate
 * @param centered whether x,y coordinates are center or top-left
 */
export const circle = (radius: number, spin = 0, x = 0, y = 0, centered = true) => {
  const centerX = centered ? x : x + radius;
  const centerY = centered ? y : y + radius;

  const tx = radius * Math.cos(spin);
  const ty = radius * Math.sin(spin);

  return `
    M ${centerX + tx}, ${centerY - ty}
    ${semicircle(radius, spin)}
    ${semicircle(radius, spin, false, true)}
    `;
};

/**
 * A 'semicircle' from current point.
 * 
 * @param radius 
 * @param spin 
 * @param mirror 
 * @param flip 
 */
export const semicircle = (radius:number, spin = 0, mirror = false, flip = false, x = 0, y = 0, centered = true) => {
  const centerX = centered ? x : x + radius;
  const centerY = centered ? y : y + radius;

  const sweep = mirror ? 0 : 1;

  const dx = radius * Math.cos(spin);
  const tx = flip ? dx: centerX - dx ;

  const dy = radius * Math.sin(spin)
  const ty = flip ? centerY - dy : dy;

  return `
  M ${centerX + tx}, ${centerY - ty}
  a ${radius} ${radius} 0 0 ${sweep} ${-tx*2} ${ty*2}`
}

/**
 * A 'polygon' path.
 *
 * @param points
 * @param spin
 * @param radius
 * @param x optional x coordinate
 * @param y optioanl y coordinate
 * @param centered whether x,y coordinates are center or top-left
 */
export const polygon = (
  radius: number,
  points: number,
  spin: number,
  x = 0,
  y = 0,
  centered = true
) => {
  const centerX = centered ? x : x + radius;
  const centerY = centered ? y : y + radius;

  return (
    'M' +
    range(points)
      .map(function(i) {
        var point = indexedPoint(centerX, centerY, i, points, spin, radius);
        return point.x + ',' + point.y;
      })
      .join(' ') +
    'z'
  );
};


/**
 * Star polygons
 *
 * @param radius outer radius
 * @param retraction percent of outer radius that forms an inner radius
 * @param points
 * @param spin
 * @param x
 * @param y
 * @param centered
 */
export const star = (
  radius: number,
  retraction: number,
  points: number,
  spin: number,
  x = 0,
  y = 0,
  centered = true
) => {
  const centerX = centered ? x : x + radius;
  const centerY = centered ? y : y + radius;
  const vertices = points * 2;
  const inner = radius * Math.min(1.0, retraction);

  const pointToCorner = (
    x: number,
    y: number,
    index: number,
    total: number,
    spin: number,
    radius: number
  ) => {
    const angle = ((Math.PI * 2) / total) * index + spin;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tx = x + radius * sin;
    const ty = y + radius * cos;
    return {
      x: tx,
      y: ty,
    };
  };

  return (
    'M' +
    range(vertices)
      .map(function(i) {
        var point = pointToCorner(
          centerX,
          centerY,
          i,
          vertices,
          spin,
          i % 2 === 0 ? radius : inner
        );
        return point.x + ',' + point.y;
      })
      .join(' ') +
    'z'
  );
};


/**
 * A pointed rectangle.
 *
 * @param width width (excluding pointed caps)
 * @param height 
 * @param capDirection the end-cap style: 'outer' | 'inner' | 'left' | 'right'
 * @param peak pointiness
 * @param x optional x coordinate
 * @param y optional y coordinate
 * @param centered whether x,y coordinates are center or top-left
 */
export const pointed = (
  width: number,
  height: number,
  capDirection: endCapDirection = 'outer',
  peak?: number,
  x = 0,
  y = 0,
  centered = true
) => {
  const p = peak || height /2;
  const centerX = centered ? x : x + width / 2;
  const centerY = centered ? y : y + height / 2;

  const ty = height / 2;
  const tx = (width-2*p)/2;

  const rightSide =
    capDirection === 'outer' || capDirection === 'right'
      ? `l ${p} ${ty} l ${-p} ${ty}`
      : `l ${-p} ${ty} l ${p} ${ty}`;
  const leftSide =
    capDirection === 'outer' || capDirection === 'left'
      ? `l ${-p} ${-ty} l ${p} ${-ty}`
      : `l ${p} ${-ty} l ${-p} ${-ty}`;

  return `M ${centerX - tx},${centerY - ty} 
        h ${tx*2}
        ${rightSide}
        h ${-tx * 2}
        ${leftSide}
        `;
};

/**
 * A 'squircle' shape.
 * 
 * https://en.wikipedia.org/wiki/Squircle
 */

 /**
  * An 'ellipse' shape.
  * 
  * https://en.wikipedia.org/wiki/Ellipse
  */