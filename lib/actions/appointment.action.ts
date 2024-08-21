"use server";

import { CreateAppointmentParams } from "@/types";
import { createAdminClient } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

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

    return parseStringify(appointment);
  } catch (err) {
    console.error("Failed to create appointment:", err);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const { database } = await createAdminClient();

    const appointment = await database.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

export const getAppointmentDates = async () => {
  try {
    const { database } = await createAdminClient();

    const appointments = await database.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return parseStringify(appointments.documents);
  } catch (error) {
    console.error(error);
  }
};
