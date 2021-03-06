import { UPInput } from "src/resolvers/UPInput";

export const validateRegister = (options: UPInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email'
      }
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2'
      }
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot include an @'
      }
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: 'password',
        message: 'password must be greater than 3'
      }
    ];
  }

  return null;
};