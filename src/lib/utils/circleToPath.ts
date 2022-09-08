const circleToPath = (x, y, r) =>
  `M ${x} ${y} m -${r}, 0a ${r} ${r} 0 1 0 ${r * 2} 0a ${r} ${r} 0 1 0 -${
    r * 2
  } 0`;

export default circleToPath;
