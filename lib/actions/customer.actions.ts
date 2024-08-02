import { ID, Query } from "node-appwrite";
import { account, users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.fullName
    );

    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      user.password,
      user.fullName
    );

    console.log({ newUser });
  } catch (err: any) {
    if (err && err?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
  }
};
