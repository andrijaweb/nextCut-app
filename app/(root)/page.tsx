import Button from "@/components/Button";
import Image from "next/image";

const Home = () => {
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
            <h1 className="heading-h1">Welcome, Andrija 👋</h1>
            <p className="text-textGray-500 mt-2 mb-5">
              Your perfect cut, just a tap away. Get your appointment in
              seconds!
            </p>
            <Button className="self-start">Get Appointment</Button>
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

export default Home;
