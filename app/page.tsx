"use client";

import { logout } from "@/lib/actions/customer.actions";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/sign-in");
  }

  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
