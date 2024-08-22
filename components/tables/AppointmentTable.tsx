"use client";

import { Appointment } from "@/types/appwrite.types";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import StatusMini from "../StatusMini";
import Table from "../Table";

const AppointmentTable = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  console.log(appointments);

  return (
    <Table columns="0.6fr 2fr 1.4fr 2fr 1.4fr 0.2fr">
      <Table.Header>
        <div>#</div>
        <div>Full Name</div>
        <div>Status</div>
        <div>Date</div>
        <div>Barber</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={appointments}
        render={(appointment, i) => (
          <Table.Row key={appointment.$id}>
            <p>{i}</p>
            <p>{appointment.customer.fullName}</p>
            <StatusMini status={appointment.status} />
            <p>{format(appointment.scheduleDate, "MMMM dd, yyyy HH:mm")}</p>
            <p>{appointment.barber}</p>
            <div className="flex items-center gap-2">
              <button className="text-[#008450] hover:text-green-800">
                <Check />
              </button>
              <button className="text-[#B81D13] hover:text-red-800">
                <X />
              </button>
            </div>
          </Table.Row>
        )}
      />

      <Table.Footer>© NextCut | All rights reserved</Table.Footer>
    </Table>
  );
};

export default AppointmentTable;
