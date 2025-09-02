import { Button, ButtonProps } from "primereact/button";
import { twMerge } from "tailwind-merge";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  click?: () => void;
}

export default function CustomButton({
  icon,
  label,
  className,
  click,
  ...rest
}: CustomButtonProps) {
  const mergedClass = twMerge(
    "border border-gray-400 hover:cursor-point hover:bg-green-700 px-3 py-2 rounded-md hover:text-white",
    className
  );
  return (
    <Button unstyled label={label} icon={icon} className={mergedClass} {...rest} onClick={click} />
  );
}
