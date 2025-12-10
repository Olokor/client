import React, { ReactNode } from "react";

interface SquareCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

export const SquareCard: React.FC<SquareCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = "from-blue-500 to-purple-600" 
}) => {
  return (
    <div className={`flex flex-col justify-center items-center rounded-2xl shadow-md bg-gradient-to-r ${color} text-white w-full aspect-square p-4`}>
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="text-xs sm:text-sm font-medium text-center">{title}</h3>
      <p className="text-lg sm:text-2xl font-bold">{value}</p>
    </div>
  );
};
