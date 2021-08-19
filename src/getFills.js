function getFills(svg) {
  let fills = svg.match(/ fill="[^"]*"/gim);
  if (fills) fills = fills.map((i) => i.replace(/\"| fill=/gim, ""));
  return fills;
}

module.exports = getFills;
