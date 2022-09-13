const circleToPath = ({ cx, cy, r }) => {
  let _cx = cx || 0;
  let _cy = cy || 0;
  let _r = r || 0;

  return `M ${_cx} ${_cy} m -${_r}, 0a ${_r} ${_r} 0 1 0 ${
    r * 2
  } 0a ${_r} ${_r} 0 1 0 -${r * 2} 0`;
};

export default circleToPath;
