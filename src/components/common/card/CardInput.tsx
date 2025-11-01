import  { type ReactNode } from "react";
interface Props {
  title: string;
  children: ReactNode;
}
const CardInput = ({ children, title }: Props) => {
  return (
    <div className="w-full border">
      <div className="p-4 border-b bg-[#F5FFFA] text-primary font-medium">
        {title}
      </div>
      <div className="p-4 flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default CardInput;
