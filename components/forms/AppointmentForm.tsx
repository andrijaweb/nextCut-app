"use client";

import { createAppointment } from "@/lib/actions/appointment.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import Button from "../Button";
import { Input } from "../Input";

interface AppointmentProps {
  userId: string;
  customerId: string;
}

interface Inputs {
  barber: string;
  service: string;
  date: string;
}

const AppointmentForm = ({ userId, customerId }: AppointmentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, formState, handleSubmit, reset } = useForm<Inputs>();
  const { errors } = formState;

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    try {
      if (customerId) {
        const appointment = {
          userId,
          customer: customerId,
          barber: data.barber,
          serviceType: data.service,
          scheduleDate: new Date(data.date),
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          router.push(
            `/customers/${userId}/new-appointment/confirmed?appointmentId=${newAppointment.$id}`
          );
        }
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
      <section className="mb-12 space-y-4">
        <h1 className="heading-h1">Schedule your new haircut ✂️</h1>
        <p className="text-textGray-500">Send a request for your new haircut</p>
      </section>

      <div>
        <FormRow label="Available barbers" htmlFor="barber">
          <select
            {...register("barber", {
              required: "This field is required.",
            })}
            disabled={isLoading}
          >
            <option value="john">John Merrick</option>
            <option value="patrick">Patrick Snowman</option>
            <option value="igor">Igor Stalinski</option>
          </select>
        </FormRow>
        <FormRow label="Service type" htmlFor="service">
          <select
            {...register("service", {
              required: "This field is required.",
            })}
            disabled={isLoading}
          >
            <option value="fade">Normal short haircut</option>
            <option value="fade">Fade haircut</option>
            <option value="fade">Skining head</option>
            <option value="fade">Beard Trimming</option>
          </select>
        </FormRow>
        <FormRow label="Appointment date" htmlFor="appointmentDate">
          <Input
            type="date"
            {...register("date", {
              required: "This field is required.",
            })}
            disabled={isLoading}
          />
        </FormRow>
      </div>

      <Button size="full">Submit</Button>
    </form>
  );
};

export default AppointmentForm;
