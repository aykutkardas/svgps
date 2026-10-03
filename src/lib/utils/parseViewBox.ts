// viewBox values may be separated by whitespace and/or commas
const parseViewBox = (viewBox?: string): number[] =>
  viewBox
    ? viewBox
        .trim()
        .split(/[\s,]+/)
        .map(Number)
    : [];

export default parseViewBox;
