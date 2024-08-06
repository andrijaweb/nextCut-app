"use client";

import { Check, CircleCheckBig, X } from "lucide-react";
import Table from "../Table";
import StatusMini from "../StatusMini";

interface Product {
  id: number;
  fullName: string;
  status: "confirmed" | "pending" | "denied";
  date: string;
  barber: string;
}

const products: Product[] = [
  {
    id: 1,
    fullName: "Joe Barbaro",
    status: "confirmed",
    date: "June 3, 2024, 2:00 PM",
    barber: "Vlada Fade",
  },
  {
    id: 2,
    fullName: "Patrick Snowman",
    status: "confirmed",
    date: "August 13, 2024, 9:00 AM",
    barber: "Pavle Stanic",
  },
  {
    id: 3,
    fullName: "Dwayne Washington",
    status: "pending",
    date: "October 5, 2024, 12:00 AM",
    barber: "Nikola Jokic",
  },
  {
    id: 4,
    fullName: "Jovan Micic",
    status: "denied",
    date: "October 5, 2024, 12:00 AM",
    barber: "Filip Babic",
  },
  {
    id: 5,
    fullName: "Jovan Micic",
    status: "pending",
    date: "October 5, 2024, 12:00 AM",
    barber: "Filip Babic",
  },
  {
    id: 6,
    fullName: "Jovan Micic",
    status: "confirmed",
    date: "October 5, 2024, 12:00 AM",
    barber: "Filip Babic",
  },
];

const AppointmentTable = () => {
  return (
    <Table columns="0.6fr 2fr 1.4fr 2.4fr 1.4fr 0.2fr">
      <Table.Header>
        <div>#</div>
        <div>Full Name</div>
        <div>Status</div>
        <div>Date</div>
        <div>Barber</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={products}
        render={(product) => (
          <Table.Row key={product.id}>
            <p>{product.id}</p>
            <p>{product.fullName}</p>
            <StatusMini status={product.status} />
            <p>{product.date}</p>
            <p>{product.barber}</p>
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
