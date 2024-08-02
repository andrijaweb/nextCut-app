import { Models } from "node-appwrite";

export interface Customer extends Models.Document {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
}
