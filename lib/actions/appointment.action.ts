"use server";

import { type CreateAppointmentParams } from "@/types";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const editAppointment = async (
  appointmentId: string,
  appointment: CreateAppointmentParams
) => {
  try {
    const { database } = await createAdminClient();
    const editedAppointment = await database.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!editedAppointment) throw Error;

    return parseStringify(editedAppointment);
  } catch (error) {
    console.error(error);
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

export const getAppointments = async () => {
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
