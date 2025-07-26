import { JSX } from "react";

interface CardPropeType {
  style?: string;
  children: JSX.Element
}

const Card = ({ children, style }: CardPropeType) => {
  return (
    <div className="p-4">
      <div className={`max-w rounded overflow-hidden ${style}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
