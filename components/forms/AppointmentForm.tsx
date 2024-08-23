"use client";

import {
  createAppointment,
  editAppointment,
} from "@/lib/actions/appointment.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Select, {
  type CSSObjectWithLabel,
  type OptionProps,
} from "react-select";
import Button from "../Button";
import DateSelector from "../DateSelector";
import FormRow from "./FormRow";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentProps {
  userId: string;
  customerId: string;
  appointmentToEdit?: Appointment;
}

interface Inputs {
  barber: string;
  service: string;
  date: string;
}

interface OptionType {
  value: string;
  label: string;
}

const barberOptions = [
  { value: "John Merrick", label: "John Merrick" },
  { value: "Patrick Snowman", label: "Patrick Snowman" },
  { value: "Igor Stalinski", label: "Igor Stalinski" },
];

const serviceOptions = [
  { value: "Normal short haircut", label: "Normal short haircut" },
  { value: "Fade haircut", label: "Fade haircut" },
  { value: "Skinning head", label: "Skinning head" },
  { value: "Beard trimming", label: "Beard trimming" },
];

const selectStyles = {
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#262626",
    borderRadius: "6px",
    height: "48px",
    borderColor: "#4F4F4F",
    boxShadow: "none",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#262626",
  }),
  option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1D1D1D" : "#262626",
  }),
};

const AppointmentForm = ({
  userId,
  customerId,
  appointmentToEdit,
}: AppointmentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [barberOption, setBarberOption] = useState<OptionType | null>(null);
  const [serviceOption, setServiceOption] = useState<OptionType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const router = useRouter();
  const { handleSubmit } = useForm<Inputs>();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (appointmentToEdit && barberOption && serviceOption && startDate) {
        const appointment = {
          userId,
          customer: customerId,
          barber: barberOption.value,
          serviceType: serviceOption.value,
          scheduleDate: startDate,
          status: "pending",
        };

        const editedAppointment = await editAppointment(
          appointmentToEdit.$id,
          appointment
        );
      } else if (barberOption && serviceOption && startDate) {
        const appointment = {
          userId,
          customer: customerId,
          barber: barberOption.value,
          serviceType: serviceOption.value,
          scheduleDate: startDate,
          status: "pending",
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
      {!appointmentToEdit && (
        <section className="mb-12 space-y-4">
          <h1 className="heading-h1">Schedule your new haircut ✂️</h1>
          <p className="text-textGray-500">
            Send a request for your new haircut
          </p>
        </section>
      )}

      <div className="space-y-5">
        <FormRow label="Available barbers" htmlFor="barber">
          <Select
            name="barber"
            styles={selectStyles}
            options={barberOptions}
            isDisabled={isLoading}
            onChange={(option) => setBarberOption(option as OptionType)}
          />
        </FormRow>

        <FormRow label="Service type" htmlFor="service">
          <Select
            name="serviceType"
            options={serviceOptions}
            styles={selectStyles}
            isDisabled={isLoading}
            onChange={(option) => setServiceOption(option as OptionType)}
          />
        </FormRow>

        <FormRow label="Appointment date" htmlFor="appointmentDate">
          <DateSelector
            startDate={startDate}
            setStartDate={setStartDate}
            isLoading={isLoading}
          />
        </FormRow>
      </div>

      <Button size="full" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
};

export default AppointmentForm;
