import React, { ReactNode } from "react";

interface RectCardProps {
  title: string;
  children: ReactNode;
}

export const RectCard: React.FC<RectCardProps> = ({ title, children }) => {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white w-full min-h-[200px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
};
