"use client";

import { logIn } from "@/lib/actions/customer.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button";
import FormRow from "./FormRow";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        setError("Both fields are required.");
        return;
      }

      const response = await logIn({ email, password });

      router.push("/");
    } catch (err: any) {
      setError("Wrong credentials. Please try again!");
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
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
