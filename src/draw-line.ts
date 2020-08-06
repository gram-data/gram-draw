

export type endCapDirection = 'outer' | 'inner' | 'left' | 'right';

export type endCapStyle = 'semicircle' | 'square' | 'angle'


const debug = (radius = 1) => {
  const r = Math.max(1, radius);
  return `
    m 0, ${-r}
    a ${r} ${r} 0 0 1 0 ${r * 2}
    a ${r} ${r} 0 0 1 0 ${-r * 2}
    m 0, ${r}
    `
};

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
 * A 'vector' line draws a straight line segment.
 * 
 * @param length 
 * @param direction 
 */
export const vector = (length: number, direction:number) => {
  const tx = length * Math.cos(direction);
  const ty = length * Math.sin(direction);
  return `l ${tx},${ty}`
}

/**
 * A 'bend' turn uses an arc to reach the end point
 * 
 * @param length straight-line distance to end of turn
 * @param direction straight-line angle to end of turn
 * @param fraction turn fraction
 * @param mirror 
 * @param flip 
 */
export const bend = (length: number, direction:number, fraction = 1, mirror = false) => {

  const sweep = mirror ? 0 : 1;

  const tx = length * Math.cos(direction);
  const ty = length * Math.sin(direction);
  // arcRadius = a = b = r
  // length = c
  // c^2 = a^2 - 2ab*cos𝛳
  // c   = √ (r^2 - 2rr cos𝛳)
  // c^2 = r^2 - 2rr*cos𝛳
  // c^2/cos𝛳 = r^2 - 2rr*cor

  // isoceles triangle law of cosines
  // cos 𝛾 = 1 - (c^2 / 2*a^2)
  // c^2 = 2a^2(1 - cos 𝛾)
  // (c^2) / (1 - cos 𝛾) = 2a^2
  // ((c^2) / (1 - cos 𝛾))/2 = a^2
  // √(((c^2) / (1 - cos 𝛾))/2) = a
  const c = length;
  const a = Math.sqrt(((c*c)/(1- Math.cos(Math.PI/fraction)))/2)

  const arcRadius = a;

  return `
  a ${arcRadius} ${arcRadius} ${Math.PI-direction} ${0} ${sweep} ${tx} ${ty}`
}


/**
 * A 'bank' turn use two equal line segments to reach the endpoint
 * 
 * @param length straight-line distance to end of turn
 * @param direction straight-line angle to end of turn
 * @param fraction turn fraction
 * @param mirror 
 * @param flip 
 */
export const bank = (length: number, direction:number, fraction = 1, mirror = false) => {

  // arcRadius = a = b = r
  // length = c
  // c^2 = a^2 - 2ab*cos𝛳
  // c   = √ (r^2 - 2rr cos𝛳)
  // c^2 = r^2 - 2rr*cos𝛳
  // c^2/cos𝛳 = r^2 - 2rr*cor

  // isoceles triangle law of cosines
  // cos 𝛾 = 1 - (c^2 / 2*a^2)
  // c^2 = 2a^2(1 - cos 𝛾)
  // (c^2) / (1 - cos 𝛾) = 2a^2
  // ((c^2) / (1 - cos 𝛾))/2 = a^2
  // √(((c^2) / (1 - cos 𝛾))/2) = a
  const c = length;
  const r = Math.sqrt(((c*c)/(1- Math.cos(Math.PI/fraction)))/2)

  const d = length/2;
  const e = Math.sqrt(r*r - d*d)
  const f = r - e;
  const g = Math.sqrt(d*d + f*f);
  const retraction = Math.atan(f/d);
  const incline = mirror ? direction + retraction : direction - retraction;
  const midX = g * Math.cos(incline);
  const midY = g * Math.sin(incline);
  const decline = mirror ? direction - retraction : direction + retraction;
  const endY = g * Math.sin(decline);
  const endX = g * Math.cos(decline);

  return `
  l ${midX} ${midY}
  ${debug()}
  l ${endX} ${endY}`
}


/**
 * A 'halfsquare' turn forms a half-box
 * 
 * @param length straight-line distance to end of turn
 * @param direction straight-line angle to end of turn
 * @param fraction turn fraction
 * @param mirror 
 * @param flip 
 */
export const halfsquare = (length: number, direction:number, fraction = 1, mirror = false) => {

  // arcRadius = a = b = r
  // length = c
  // c^2 = a^2 - 2ab*cos𝛳
  // c   = √ (r^2 - 2rr cos𝛳)
  // c^2 = r^2 - 2rr*cos𝛳
  // c^2/cos𝛳 = r^2 - 2rr*cor

  // isoceles triangle law of cosines
  // cos 𝛾 = 1 - (c^2 / 2*a^2)
  // c^2 = 2a^2(1 - cos 𝛾)
  // (c^2) / (1 - cos 𝛾) = 2a^2
  // ((c^2) / (1 - cos 𝛾))/2 = a^2
  // √(((c^2) / (1 - cos 𝛾))/2) = a
  const c = length;
  const r = Math.sqrt(((c*c)/(1- Math.cos(Math.PI/fraction)))/2)

  const d = length/2;
  const e = Math.sqrt(r*r - d*d)
  const f = r - e;
  const startX = (mirror ? f : -f) * Math.cos(Math.PI/2 + direction);
  const startY = (mirror ? f : -f) * Math.sin(Math.PI/2 + direction);
  const tx = length * Math.cos(direction);
  const ty = length * Math.sin(direction);
  const endX = (mirror ? -f : f) * Math.cos(Math.PI/2 + direction);
  const endY = (mirror ? -f : f) * Math.sin(Math.PI/2 + direction);


  return `
  l ${startX} ${startY}
  ${debug()}
  l ${tx} ${ty}
  ${debug()}
  l ${endX} ${endY}`
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
  x=0,
  y=0
) => {


  const deltaX = toX - x; // delta-x
  const deltaY = toY - y; // delta-y
  const a = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  const radius = width / 2;
  const decline = Math.asin(deltaY / a);
  // const normal = Math.PI / 2 - decline;
  // const rightSide = 
  //   (capStyle === 'semicircle') 
  //   ? arc(radius, normal, radius, capDirection === 'inner' || capDirection === 'left')
  //   : arc(radius, normal, radius, true);
  // const leftSide =
  //   (capStyle === 'semicircle') 
  //   ? arc(radius, normal, radius, capDirection === 'inner' || capDirection === 'right', true)
  //   : arc(radius, normal, radius, true);
  //   // capDirection === 'outer' || capDirection === 'left'
  //   //   ? `a ${radius} ${radius} 0 0 1 ${tx * 2} ${-ty * 2}`
  //   //   : `a ${radius} ${radius} 0 0 0 ${tx * 2} ${-ty * 2}`;

  // return `m ${x},${y} 
  //       l ${deltaX}, ${deltaY}
  //       ${rightSide}
  //       l ${-deltaX}, ${-deltaY}
  //       ${leftSide}
  //       `;'
  return bend(radius, decline);
};

