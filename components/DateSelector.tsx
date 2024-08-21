import { getAppointmentDates } from "@/lib/actions/appointment.action";
import { filterTime } from "@/lib/utils";
import { isSameDay, isWeekend, parseISO } from "date-fns";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import DatePicker from "react-datepicker";

interface DateSelectorProps {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  isLoading: boolean;
}

const getBookedTimes = (appointments: any, selectedDate: Date) => {
  return appointments
    .filter((appointment: any) =>
      isSameDay(parseISO(appointment.scheduleDate), selectedDate)
    )
    .map((appointment: any) => parseISO(appointment.scheduleDate));
};

const DateSelector = ({
  startDate,
  setStartDate,
  isLoading,
}: DateSelectorProps) => {
  const [appointments, setAppointments] = useState<any>(null);

  useEffect(() => {
    const fetchAppointmentDates = async () => {
      const appointments = await getAppointmentDates();
      setAppointments(appointments);
    };

    if (startDate) fetchAppointmentDates();
  }, [startDate]);

  return (
    <DatePicker
      name="scheduleDate"
      className="w-full bg-dark-500 border border-dark-700 h-12 rounded-md pl-2.5"
      wrapperClassName="w-full"
      selected={startDate}
      placeholderText="Select date..."
      filterDate={(date) => !isWeekend(date)}
      filterTime={filterTime}
      minDate={new Date()}
      disabled={isLoading}
      excludeTimes={
        startDate && appointments && getBookedTimes(appointments, startDate)
      }
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="dd-MM-yyyy HH:mm"
    />
  );
};

export default DateSelector;
