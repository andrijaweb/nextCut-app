"use client";

import Link from "next/link";
import Button from "../Button";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/actions/customer.actions";
import { useState } from "react";
import { SignupParams } from "@/types";
import { Customer } from "@/types/appwrite.types";

interface Inputs {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const RegisterForm = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, formState, handleSubmit } = useForm<Inputs>();
  const { errors } = formState;

  async function onSubmit(data: SignupParams) {
    setIsLoading(true);
    try {
      const customerData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      const newUser = await signUp(customerData);

      setUser(newUser);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 space-y-2.5">
        <h1 className="heading-h1">Create your account</h1>
        <p className="regular-text">Get started with haircut appointment</p>
      </div>

      <div className="flex flex-col gap-2.5">
        <FormRow
          label="Full Name"
          htmlFor="fullname"
          error={errors?.fullName?.message}
        >
          <input
            type="text"
            className="input"
            placeholder="Andrija Djordjevic"
            id="fullname"
            disabled={isLoading}
            {...register("fullName", { required: "This field is required." })}
          />
        </FormRow>
        <div className="flex md:flex-row gap-5">
          <FormRow label="Email" htmlFor="email" error={errors?.email?.message}>
            <input
              type="email"
              className="input"
              placeholder="andrijadj@gmail.com"
              id="email"
              disabled={isLoading}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>
          <FormRow label="Phone" htmlFor="phone" error={errors?.phone?.message}>
            <input
              type="phone"
              className="input"
              placeholder="+381 61 4029023"
              id="phone"
              disabled={isLoading}
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value:
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
                  message: "Please provide a valid phone number",
                },
              })}
            />
          </FormRow>
        </div>
        <FormRow
          label="Password"
          htmlFor="password"
          error={errors?.password?.message}
        >
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            id="password"
            disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs at least 8 characters.",
              },
            })}
          />
        </FormRow>
      </div>
      <Button size="full" className="mt-8" disabled={isLoading}>
        {!isLoading ? "Sign up" : "Loading..."}
      </Button>
      <Link className="inline-block mt-2.5" href="/sign-in">
        Already have an account?{" "}
        <span className="text-yellow-500 font-medium">Sign in.</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
