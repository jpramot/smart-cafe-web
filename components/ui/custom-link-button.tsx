import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CustomLinkButtonProps = {
  icon?: ReactNode;
  label: string;
  className?: string;
  href: string;
};

export default function CustomLinkButton({ icon, label, className, href }: CustomLinkButtonProps) {
  const mergedClass = twMerge(
    "border border-gray-400 hover:cursor-point hover:bg-green-700 px-3 py-2 rounded-md hover:text-white",
    className
  );
  return (
    <Link href={href} className={mergedClass}>
      <div className="flex gap-0.5 items-center justify-center">
        {icon}
        {label}
      </div>
    </Link>
  );
}
