import StateCard from "@/components/StateCard";
import AppointmentTable from "@/components/tables/AppointmentTable";
import { getAppointments } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import { Appointment } from "@/types/appwrite.types";
import { CalendarCheck, CalendarClock, CalendarX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminPage = async () => {
  const user = await getLoggedInUser();
  const appointments: Appointment[] = await getAppointments();
  const statusCounts = appointments.reduce(
    (acc, appointment) => {
      if (
        appointment.status === "confirmed" ||
        appointment.status === "pending" ||
        appointment.status === "declined"
      )
        acc[appointment.status] = acc[appointment.status] + 1;
      return acc;
    },
    { confirmed: 0, pending: 0, declined: 0 }
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 px-3 xl:px-12 pt-5 pb-24">
      <header className="sticky top-3 z-30 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/imgs/logo.svg"
            width={32}
            height={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-lg font-medium">Dashboard</p>
      </header>

      <main>
        <section className="mb-12 space-y-4">
          <h1 className="heading-h1">Welcome, {user.name} 👋</h1>
          <p className="text-textGray-500">
            Control appointments and clients as desired
          </p>
        </section>

        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row flex-wrap xl:gap-10 mb-16">
          <StateCard
            state="confirmed"
            count={statusCounts.confirmed}
            label="Confirmed"
            icon={CalendarCheck}
          />

          <StateCard
            state="pending"
            count={statusCounts.pending}
            label="Pending"
            icon={CalendarClock}
          />

          <StateCard
            state="declined"
            count={statusCounts.declined}
            label="Declined"
            icon={CalendarX}
          />
        </section>

        <AppointmentTable appointments={appointments} />
      </main>
    </div>
  );
};

export default AdminPage;
