import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
interface Props {
  data: {
    name: string;
    label: string;
    component?: ReactNode;
  }[];
  form: UseFormReturn<any>;
  isRow?: boolean;
  isRowParent?: boolean;
}
const DetailField = ({ data, form, isRow = true, isRowParent }: Props) => {
  return (
    <div
      className={`flex ${isRowParent ? "flex-row" : "flex-col"} gap-4
    `}
    >
      {data.map((item) => (
        <div
          key={item.name + item.label}
          className={`flex ${isRow ? "flex-row" : "flex-col"} gap-2
    `}
        >
          <div className="max-w-[200px] w-full text-wrap text-[#999999]">
            {item.label}
          </div>
          {item.component ? (
            form.watch(item.name) ? (
              item.component
            ) : (
              "-"
            )
          ) : (
            <div className="text-[#464646]">{form.watch(item.name) ?? "-"}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DetailField;
