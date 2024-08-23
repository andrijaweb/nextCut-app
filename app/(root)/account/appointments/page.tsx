import AppointmentsList from "@/components/AppointmentsList";
import { getAppointments } from "@/lib/actions/appointment.action";

const AppointmentPage = async () => {
  const appointments = await getAppointments();

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {appointments.length === 0 ? (
        <p className="text-lg">You have no appointments yet</p>
      ) : (
        <AppointmentsList appointments={appointments} />
      )}
    </div>
  );
};

export default AppointmentPage;
