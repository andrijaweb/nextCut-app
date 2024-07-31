import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

export default function Homepage() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/imgs/logo.svg"
            width={1000}
            height={1000}
            alt="NextCut"
            className="mb-12 h-10 w-fit"
          />

          <LoginForm />

          <div className="text-textGray-500 mt-20">
            <p>© NextCut | All rights reserved</p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/imgs/barber.png"
        width={1000}
        height={1000}
        alt="barbershop interior"
        className="rounded-tl-3xl rounded-bl-3xl side-img max-w-[50%]"
      />
    </div>
  );
}
