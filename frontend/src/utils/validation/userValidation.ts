export const isValidEmail = (email: string): boolean => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return false;
  return true;
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
