export type Language = 'EN' | 'RU';

type MessageTypes = {
  success: {
    login: string;
    registration: string;
    reset: string;
  };
  error: {
    invalidCredential: string;
    invalidEmail: string;
    emailAlreadyInUse: string;
    userDisabled: string;
    userNotFound: string;
    wrongPassword: string;
    weakPassword: string;
    userExists: string;
    operationNotAllowed: string;
    tooManyRequests: string;
    network: string;
    unknown: string;
  };
};

export type Messages = {
  [key in Language]: MessageTypes;
};
