import Link from "next/link";
import Button from "../Button";
import FormRow from "./FormRow";

const RegisterForm = () => {
  return (
    <form>
      <div className="mb-10 space-y-2.5">
        <h1 className="heading-h1">Create your account</h1>
        <p className="regular-text">Get started with haircut appointment</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <FormRow label="Full Name" htmlFor="fullname">
          <input
            type="text"
            className="input"
            placeholder="Andrija Djordjevic"
            id="fullname"
            required
          />
        </FormRow>
        <div className="flex md:flex-row gap-5">
          <FormRow label="Email" htmlFor="email">
            <input
              type="email"
              className="input"
              placeholder="andrijadj@gmail.com"
              id="email"
              required
            />
          </FormRow>
          <FormRow label="Phone" htmlFor="phone">
            <input
              type="phone"
              className="input"
              placeholder="+381 61 4029023"
              id="phone"
              required
            />
          </FormRow>
        </div>
        <FormRow label="Password" htmlFor="password">
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            id="password"
            required
          />
        </FormRow>
      </div>
      <Button size="full" className="mt-8">
        Sign up
      </Button>
      <Link className="inline-block mt-2.5" href="/sign-in">
        Already have an account?{" "}
        <span className="text-yellow-500 font-medium">Sign in.</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
