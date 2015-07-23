export function circle(coordinates) {
  var circle = [],
      length = 0,
      lengths = [length],
      polygon = d3.geom.polygon(coordinates),
      p0 = coordinates[0],
      p1,
      x,
      y,
      i = 0,
      n = coordinates.length;

  // Compute the distances of each coordinate.
  while (++i < n) {
    p1 = coordinates[i];
    x = p1[0] - p0[0];
    y = p1[1] - p0[1];
    lengths.push(length += Math.sqrt(x * x + y * y));
    p0 = p1;
  }

  var area = polygon.area(),
      radius = Math.sqrt(Math.abs(area) / Math.PI),
      centroid = polygon.centroid(-1 / (6 * area)),
      angleOffset = -Math.PI / 2, // TODO compute automatically
      angle,
      i = -1,
      k = 2 * Math.PI / lengths[lengths.length - 1];

  // Compute points along the circle’s circumference at equivalent distances.
  while (++i < n) {
    angle = angleOffset + lengths[i] * k;
    circle.push([
      centroid[0] + radius * Math.cos(angle),
      centroid[1] + radius * Math.sin(angle)
    ]);
  }

  return circle;
}
