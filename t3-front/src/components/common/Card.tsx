import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`flex justify-start rounded-xl bg-white-default p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
