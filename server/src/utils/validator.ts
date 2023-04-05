export const validateText = function (text: string, regex: RegExp) {
  return !!regex.exec(text);
};
