

export type endCapDirection = 'outer' | 'inner' | 'left' | 'right';

export type endCapStyle = 'semicircle' | 'square' | 'angle'

/**
 * A 'point' which is in visible.
 * 
 * @param x 
 * @param y 
 */
export const point = (x = 0, y = 0) => {
  return `M ${x}, ${y}`
};



/**
 * A 'vector' line draws a line from the center to the circumference of a circle,
 * without returning.
 * 
 * @param length 
 * @param spin 
 */
export const vector = (length: number, spin = 0) => {
  const tx = length * Math.cos(spin);
  const ty = length * Math.sin(spin);
  return `l ${tx},${ty}`
}


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
 * A 'wideline' is a line outline with fill.
 *
 * @param toX  ef
 * @param toY fe
 * @param width fe
 * @param capDirection fe
 * @param x ef
 * @param y fe
 */
export const wideline = (
  toX: number,
  toY: number,
  width: number,
  capDirection: endCapDirection = 'outer',
  x = 0,
  y = 0
) => {
  const deltaX = toX - x; // delta-x
  const deltaY = toY - y; // delta-y
  const a = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  const radius = width / 2;
  const decline = Math.asin(deltaY / a);
  const normal = Math.PI / 2 - decline;
  const ty = radius * Math.sin(normal);
  const tx = radius * Math.cos(normal);
  const rightSide =
    capDirection === 'outer' || capDirection === 'right'
      ? `a ${radius} ${radius} 0 0 1 ${-tx * 2} ${ty * 2}`
      : `a ${radius} ${radius} 0 0 0 ${-tx * 2} ${ty * 2}`;
  const leftSide =
    capDirection === 'outer' || capDirection === 'left'
      ? `a ${radius} ${radius} 0 0 1 ${tx * 2} ${-ty * 2}`
      : `a ${radius} ${radius} 0 0 0 ${tx * 2} ${-ty * 2}`;

  return `M ${x},${y} 
        l ${deltaX}, ${deltaY}
        ${rightSide}
        l ${-deltaX}, ${-deltaY}
        ${leftSide}
        `;
};


/**
 * A 'bracket' is a line with only the end-caps.
 *
 * @param toX  ef
 * @param toY fe
 * @param width fe
 * @param capDirection fe
 * @param capStyle cap shape
 * @param x ef
 * @param y fe
 */
export const bracket = (
  toX: number,
  toY: number,
  width: number,
  capDirection: endCapDirection = 'outer',
  capStyle: endCapStyle = 'semicircle',
  x = 0,
  y = 0
) => {


  const deltaX = toX - x; // delta-x
  const deltaY = toY - y; // delta-y
  const a = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  const radius = width / 2;
  const decline = Math.asin(deltaY / a);
  const normal = Math.PI / 2 - decline;
  const rightSide = 
    (capStyle === 'semicircle') 
    ? semicircle(radius, normal, capDirection === 'inner' || capDirection === 'left')
    : semicircle(radius, normal, true);
  const leftSide =
    (capStyle === 'semicircle') 
    ? semicircle(radius, normal, capDirection === 'inner' || capDirection === 'right', true)
    : semicircle(radius, normal, true);
    // capDirection === 'outer' || capDirection === 'left'
    //   ? `a ${radius} ${radius} 0 0 1 ${tx * 2} ${-ty * 2}`
    //   : `a ${radius} ${radius} 0 0 0 ${tx * 2} ${-ty * 2}`;

  return `M ${x},${y} 
        l ${deltaX}, ${deltaY}
        ${rightSide}
        l ${-deltaX}, ${-deltaY}
        ${leftSide}
        `;
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
