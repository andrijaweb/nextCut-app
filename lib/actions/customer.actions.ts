"use server";

import { ID } from "node-appwrite";
import {
  account,
  CUSTOMER_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async ({ password, ...customerData }: SignupParams) => {
  const { email, fullName } = customerData;

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );

    if (!newAccount) throw new Error("Error creating account");

    const newCustomer = await databases.createDocument(
      DATABASE_ID!,
      CUSTOMER_COLLECTION_ID!,
      ID.unique(),
      {
        ...customerData,
        customerId: newAccount.$id,
      }
    );

    if (!newCustomer) throw new Error("Error creating a customer");

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newCustomer);
  } catch (err: any) {
    throw err;
  }
};
