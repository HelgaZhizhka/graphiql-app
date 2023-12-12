const atLeastMinimumLength = (password: string) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password: string) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password: string) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password: string) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password: string) =>
  new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

export const testingPasswordStrength = (password?: string) => {
  if (!password) return 0;
  let points = 0;
  if (atLeastMinimumLength(password)) points += 1;
  if (atLeastOneUppercaseLetter(password)) points += 1;
  if (atLeastOneLowercaseLetter(password)) points += 1;
  if (atLeastOneNumber(password)) points += 1;
  if (atLeastOneSpecialChar(password)) points += 1;

  if (points >= 5) return 10;
  if (points >= 3) return 5;
  return 0;
};
