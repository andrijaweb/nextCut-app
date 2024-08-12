import { StringToBoolean } from "class-variance-authority/types";

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

declare type CreateAppointmentParams = {
  userId: string;
  customer: string;
  barber: string;
  serviceType: string;
  scheduleDate: Date;
};
