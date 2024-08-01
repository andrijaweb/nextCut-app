import Button from "../Button";
import FormRow from "./FormRow";

export default function LoginForm() {
  return (
    <form>
      <div className="mb-12 space-y-2.5">
        <h1 className="heading-h1">Welcome back</h1>
        <p className="regular-text">Please enter your credentials to sign in</p>
      </div>

      <div className="flex flex-col gap-5">
        <FormRow label="Email">
          <input
            type="text"
            className="input"
            placeholder="andrijadj@gmail.com"
            id="Email"
          />
        </FormRow>
        <FormRow label="Password">
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            id="Password"
          />
        </FormRow>
      </div>
      <Button size="full" className="mt-10">
        Log In
      </Button>
    </form>
  );
}
