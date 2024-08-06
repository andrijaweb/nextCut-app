import { capitalizeFirstLetter } from "@/lib/utils";
import clsx from "clsx";
import { Ban, CircleCheck, CircleEllipsis } from "lucide-react";
import { FC } from "react";

interface StatusMiniProps {
  status: "confirmed" | "pending" | "denied";
}

const StatusMini: FC<StatusMiniProps> = ({ status }) => {
  const icons = {
    confirmed: <CircleCheck />,
    pending: <CircleEllipsis />,
    denied: <Ban />,
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-2.5 px-4 py-2 rounded-full w-fit",
        {
          "bg-green-600/10 text-[#008450]": status === "confirmed",
          "bg-yellow-600/10 text-[#EFB700]": status === "pending",
          "bg-red-600/10 text-[#B81D13]": status === "denied",
        }
      )}
    >
      {icons[status]}
      <p className="font-medium">{capitalizeFirstLetter(status)}</p>
    </div>
  );
};

export default StatusMini;
