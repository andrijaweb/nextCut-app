import Button from "@/components/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen min-h-screen text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found ☹️
      </h1>
      <Button href="/" className="text-xl">
        Go back home
      </Button>
    </main>
  );
};

export default NotFound;
