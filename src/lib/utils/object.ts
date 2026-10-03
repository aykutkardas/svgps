export const pick = <T extends object>(obj: T, keys: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));

export const omit = <T extends object>(obj: T, keys: string[]) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key)),
  );

export const uniq = <T>(items: T[]): T[] => Array.from(new Set(items));
