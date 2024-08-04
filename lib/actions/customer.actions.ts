"use server";

import { ID, Query } from "node-appwrite";
import {
  createAdminClient,
  createSessionClient,
  CUSTOMER_COLLECTION_ID,
  DATABASE_ID,
} from "../appwrite.config";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const getCustomer = async ({ customerId }: { customerId: string }) => {
  try {
    const { database } = await createAdminClient();

    const customer = await database.listDocuments(
      DATABASE_ID!,
      CUSTOMER_COLLECTION_ID!,
      [Query.equal("customerId", [customerId])]
    );

    return parseStringify(customer.documents[0]);
  } catch (err) {
    throw err;
  }
};

export const logIn = async ({ email, password }: LogInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error("Error creating a new session");

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;
  } catch (err) {
    throw err;
  }
};

export const signUp = async ({ password, ...customerData }: SignupParams) => {
  const { email, fullName } = customerData;

  try {
    const { account, database } = await createAdminClient();

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );

    if (!newAccount) throw new Error("Error creating account");

    const newCustomer = await database.createDocument(
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

    if (!session) throw new Error("Error creating a session.");

    cookies().set("auth-session", session.secret, {
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

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("auth-session");
    await account.deleteSession("current");
  } catch (err) {
    return null;
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    return parseStringify(user);
  } catch (err) {
    return null;
  }
};
