function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export const circle = (x: number, y: number, diameter: number) => {
  const r = diameter / 2;
  return `
  M ${x + r}, ${y}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 ${-(r * 2)},0
  `;
};

export const rect = (width: number, height: number) => {
  return `
  M ${-width / 2} ${-height / 2}
  h ${width}
  v ${height}
  h ${-width}
  z`;
};

export const stadium = (radius: number, arc: number) => {
  const tx = Math.cos(arc) * radius;
  const ty = Math.sin(arc) * radius;
  const rightSide = `a ${radius} ${radius} 0 0 1 0 ${ty * 2}`;
  const leftSide = `a ${radius} ${radius} 0 0 1 0 ${-ty * 2}`;
  return `M ${-tx},${-ty} 
        h ${tx * 2}
        ${rightSide}
        h ${-tx * 2}
        ${leftSide}
        `;
};

export const segment = (radius: number, arc: number) => {
  const tx = Math.cos(arc) * radius;
  const ty = Math.sin(arc) * radius;
  const rightSide = `a ${radius} ${radius} 0 0 1 0 ${ty * 2}`;
  const leftSide = `a ${radius} ${radius} 0 0 0 0 ${-ty * 2}`;
  return `M ${-tx},${-ty} 
        h ${tx * 2}
        ${rightSide}
        h ${-tx * 2}
        ${leftSide}
        `;
};

export const polygon = (points: number, spin: number, size: number) => {
  return (
    'M' +
    range(points)
      .map(function (i) {
        var point = pointToCorner(i, points, spin, size);
        return point.x + ',' + point.y;
      })
      .join(' ') +
    'z'
  );
};

const pointToCorner = (
  index: number,
  total: number,
  spin: number,
  size: number
) => {
  const x = 0;
  const y = size;
  const angle = ((Math.PI * 2) / total) * index + spin;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tx = x * cos - y * sin;
  const ty = x * sin + y * cos;
  return {
    x: tx,
    y: ty,
  };
};
