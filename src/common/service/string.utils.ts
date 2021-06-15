export const removeQuotes = (value: string) => value.replace('"', '').replace('"', '');

export const generateAlphanumericString = (length = 20) =>
  Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
