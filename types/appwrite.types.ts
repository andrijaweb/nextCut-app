import { Models } from "node-appwrite";
import { Gender } from ".";

export interface Customer extends Models.Document {
  customerId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
}

export interface Appointment extends Models.Document {
  customer: Customer;
  scheduleDate: Date;
  serviceType: string;
  userId: string;
  barber: string;
  status: string;
}
