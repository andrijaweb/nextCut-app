import Button from "@/components/Button";
import { getAppointment } from "@/lib/actions/appointment.action";
import { Barbers } from "@/lib/constants";
import { capitalizeFirstLetter, formatDateTime } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

const ConfirmedPage = async ({
  searchParams,
}: {
  searchParams: { appointmentId: string };
}) => {
  const appointmendId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmendId);

  return (
    <div className="flex h-screen min-h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10">
        <Image
          src="/assets/imgs/logo.svg"
          width={1000}
          height={1000}
          alt="logo"
          className="mb-8 h-10 w-fit"
        />

        <section className="flex flex-col items-center">
          <Image
            src="/assets/imgs/confirmed.gif"
            width={150}
            height={150}
            alt="confirmed"
          />
          <h1 className="heading-h1 max-w-[42rem] text-center">
            Your appointment has been{" "}
            <span className="text-green-500">successfully</span> submitted
          </h1>
          <p className="text-textGray-500 mt-2.5 mb-8">
            Please wait for admin approval.
          </p>
          <Button>Go to Home</Button>
        </section>

        <section className="text-textGray-500 flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row">
          <h3 className="text-white font-medium text-2xl">
            Appointment Details
          </h3>
          <p>{appointment.barber}</p>
          <p>{appointment.serviceType}</p>
          <div className="flex items-center gap-2.5">
            <CalendarDays />
            <p>{formatDateTime(appointment.scheduleDate).dateTime}</p>
          </div>
          <p className="text-yellow-500 font-medium cursor-pointer">
            Edit appointment
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConfirmedPage;
