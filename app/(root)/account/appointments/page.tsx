import AppointmentsList from "@/components/AppointmentsList";
import BackButton from "@/components/BackButton";
import { getCustomerAppointments } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";

const AppointmentPage = async () => {
  const user = await getLoggedInUser();
  const appointments = await getCustomerAppointments(user.$id);

  return (
    <div>
      <BackButton />
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
