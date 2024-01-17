import { format } from "date-fns";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
export const TableHeading: React.FC<Props> = ({ children }) => {
  return (
    <p className="text-center flex content-center justify-center py-1 px-4 text-2xl rounded-xl  text-sky-300">
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: "primary" | "secondary" | "danger";
}

const appearanceToClassNames = {
  primary: "text-sky-300 bg-sky-950 hover:bg-sky-800",
  secondary: "text-slate-300 bg-slate-950 hover:bg-slate-800",
  danger: "text-red-300 bg-red-950 hover:bg-red-800",
};

export const Button: React.FC<ButtonProps> = ({ title, appearance, children, ...props }) => {
  return (
    <button
      {...props}
      className={`${appearanceToClassNames[appearance]} py-2 px-4 rounded-xl m-2 max-h-10 disabled:opacity-20`}
    >
      <span>{children}</span>
    </button>
  );
};
