import Image from "next/image";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getCustomer } from "@/lib/actions/customer.actions";

interface AppointmentParams {
  params: {
    userId: string;
  };
}

const Appointment = async ({ params }: AppointmentParams) => {
  const customer = await getCustomer(params.userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src="/assets/imgs/logo.svg"
              width={1000}
              height={1000}
              alt="logo"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <div>
            {customer && (
              <AppointmentForm
                userId={params.userId}
                customerId={customer.$id}
              />
            )}
          </div>

          <p className="text-textGray-500 mt-16">
            © NextCut | All rights reserved
          </p>
        </div>
      </section>

      <Image
        src="/assets/imgs/barber_and_client.jpg"
        width={1500}
        height={1500}
        alt="barbershop interior"
        className="hidden md:block h-full object-cover max-w-[500px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
