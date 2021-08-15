function getPaths(svg) {
  let paths = svg.match(/ d="[^"]*"/gim);
  if (paths) paths = paths.map((i) => i.replace(/\"| d=/gim, "")).join(" ");
  return paths;
}

module.exports = getPaths;
