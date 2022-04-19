export const isValidEmail = (email: string): boolean => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < 8 || password.length > 29 || password.includes(" "))
    return false;
  return true;
};

export const isValidPasswordConfirm = (
  password: string,
  passwordConfirm: string
): boolean => {
  if (password !== passwordConfirm) return false;
  return true;
};
