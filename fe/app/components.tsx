import { format } from "date-fns";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
export const TableHeading: React.FC<Props> = ({ children }) => {
  return (
    <p className="text-center flex content-center justify-center underline py-1 px-4 text-2xl rounded-xl  text-sky-300">
      {children}
    </p>
  );
};

export const DateDisplay: React.FC<{ date: Date }> = ({ date }) => {
  if (!date) return null;
  const dateDate = format(date, "MMM dd, yyyy");
  const dateTime = format(date, "hh:mm:ss a");
  return (
    <div className="flex  flex-col items-center">
      <span className="mr-1 text-slate-300">{dateDate}</span>
      <span className="text-slate-600 text-xs">{dateTime}</span>
    </div>
  );
};
