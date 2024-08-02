declare type SignupParams = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

declare type LogInProps = {
  email: string;
  password: string;
};

declare type Gender = "Male" | "Female" | "Other";
