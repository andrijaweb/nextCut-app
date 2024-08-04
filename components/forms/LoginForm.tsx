"use client";

import Link from "next/link";
import Button from "../Button";
import FormRow from "./FormRow";
import { useState } from "react";
import { logIn } from "@/lib/actions/customer.actions";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!email || !password) return;

      const response = await logIn({ email, password });
      console.log(response);
      if (response) router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Password" htmlFor="password">
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRow>
      </div>
      <Button size="full" className="mt-10" disabled={isLoading}>
        {!isLoading ? "Log In" : "Logging in..."}
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
