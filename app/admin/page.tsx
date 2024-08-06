import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 pt-5">
      <header className="sticky top-3 z-30 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/imgs/logo.svg"
            width={32}
            height={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-lg font-medium">Dashboard</p>
      </header>
    </div>
  );
};

export default AdminPage;
