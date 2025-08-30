import { Button, ButtonProps } from "primereact/button";
import { twMerge } from "tailwind-merge";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
}

export default function CustomButton({ icon, label, className, ...rest }: CustomButtonProps) {
  const mergedClass = twMerge(
    "border border-gray-400 hover:cursor-point hover:bg-green-700 px-3 py-2 rounded-md hover:text-white",
    className
  );
  return <Button label={label} icon={icon} className={mergedClass} {...rest} />;
}
