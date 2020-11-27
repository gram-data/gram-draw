export function range(
  size: number,
  startAt: number = 0
): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export const indexedPoint = (
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
