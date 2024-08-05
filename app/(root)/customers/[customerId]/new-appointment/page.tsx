import Button from "@/components/Button";
import FormRow from "@/components/forms/FormRow";
import Image from "next/image";

const Appointment = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/imgs/logo.svg"
            width={1000}
            height={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <div>
            <form className="flex-1 space-y-6">
              <section className="mb-12 space-y-4">
                <h1 className="heading-h1">Schedule your new haircut ✂️</h1>
                <p className="text-textGray-500">
                  Send a request for your new haircut
                </p>
              </section>

              <div>
                <FormRow label="Available barbers" htmlFor="barber">
                  <select>
                    <option>Test</option>
                    <option>Test2</option>
                    <option>Test3</option>
                  </select>
                </FormRow>
                <FormRow label="Service type" htmlFor="service">
                  <select>
                    <option>Fade haircut + beard trimming</option>
                    <option>Shave</option>
                    <option>Normal haircut</option>
                  </select>
                </FormRow>
                <FormRow label="Appointment date" htmlFor="appointmentDate">
                  <input type="date" />
                </FormRow>
              </div>

              <Button size="full">Submit</Button>
            </form>
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
