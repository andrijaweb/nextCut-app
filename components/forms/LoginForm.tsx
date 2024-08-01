import Link from "next/link";
import Button from "../Button";
import FormRow from "./FormRow";

const LoginForm = () => {
  return (
    <form>
      <div className="mb-12 space-y-2.5">
        <h1 className="heading-h1">Welcome back</h1>
        <p className="regular-text">Please enter your credentials to sign in</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <FormRow label="Email" htmlFor="email">
          <input
            type="email"
            className="input"
            placeholder="andrijadj@gmail.com"
            id="email"
            required
          />
        </FormRow>
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
      <Button size="full" className="mt-10">
        Log In
      </Button>
      <Link className="inline-block mt-2.5" href="/sign-up">
        Don&apos;t have an account?{" "}
        <span className="text-yellow-500 font-medium">
          Create a new account.
        </span>
      </Link>
    </form>
  );
};

export default LoginForm;
