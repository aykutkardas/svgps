const toCamelCase = (key: string) =>
  key.replace(/[-_:]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());

const keyToCamelCase = (data: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [toCamelCase(key), value]),
  );

export default keyToCamelCase;
