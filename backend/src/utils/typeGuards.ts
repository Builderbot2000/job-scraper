export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

export const isObject = (object: unknown): object is object => {
  return typeof object === "object" || object instanceof Object;
};
