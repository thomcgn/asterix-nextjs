import { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string; // <-- hinzufügen
};

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${className}`}
    >
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  );
}
