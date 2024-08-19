"use server";

import { CreateAppointmentParams } from "@/types";
import { createAdminClient } from "../appwrite.config";
import { ID } from "node-appwrite";

const { DATABASE_ID, APPOINTMENT_COLLECTION_ID } = process.env;

export const createAppointment = async (
  newAppointment: CreateAppointmentParams
) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      newAppointment
    );

    return JSON.parse(JSON.stringify(appointment));
  } catch (err) {
    console.error("Failed to create appointment:", err);
  }
};
