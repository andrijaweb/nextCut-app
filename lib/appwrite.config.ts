import { cookies } from "next/headers";
import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  CUSTOMER_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

export async function createSessionClient() {
  const client = new sdk.Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!);

  const session = cookies().get("auth-session");
  if (!session || !session.value) {
    throw new Error("No valid session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new sdk.Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new sdk.Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

  return {
    get account() {
      return new sdk.Account(client);
    },

    get database() {
      return new sdk.Databases(client);
    },

    get user() {
      return new sdk.Users(client);
    },
  };
}
