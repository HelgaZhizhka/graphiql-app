export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Person {
  name: string;
  role: string;
  age: number | string;
  personality: string;
  presentation: string;
  videoSource: string;
  gitHubLink: string;
}
