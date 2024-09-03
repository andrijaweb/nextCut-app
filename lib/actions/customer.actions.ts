"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { type LogInProps, type SignupParams } from "@/types";
import { type Customer } from "@/types/appwrite.types";
import { redirect } from "next/navigation";

const { DATABASE_ID, CUSTOMER_COLLECTION_ID } = process.env;

export const getCustomer = async (customerId: string): Promise<Customer> => {
  try {
    const { database } = await createAdminClient();

    const customer = await database.listDocuments(
      DATABASE_ID!,
      CUSTOMER_COLLECTION_ID!,
      [Query.equal("customerId", [customerId])]
    );

    if (!customer) throw new Error("Error getting valid customer.");

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
    if (err instanceof AppwriteException) throw new Error(err.message);
    throw new Error("An unexpected error occurred.");
  }
};

export const signUp = async ({
  password,
  ...customerData
}: SignupParams): Promise<Customer> => {
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
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("auth-session");
    await account.deleteSession("current");
    redirect("/sign-in");
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
