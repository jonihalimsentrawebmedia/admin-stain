import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { type ReactNode } from "react";
import { HiPencil, HiPlus } from "react-icons/hi";

interface Props {
  label: string;
  buttonGroup: {
    type: "add" | "edit" | "save" | "cancel" | "save";
    label: string;
    onClick: () => void;
    element?: ReactNode;
    isDisabled?: boolean;
  }[];
}
const ButtonTitleGroup = (props: Props) => {
  const { buttonGroup, label } = props;
  return (
    <div className="flex gap-4 items-center justify-between">
      <p className="text-3xl font-semibold text-neutral">{label}</p>
      <div className="flex gap-4 items-center">
        {buttonGroup.map((row, K) => {
          if (row.element) {
            return row.element;
          } else {
            if (row.type == "add") {
              return (
                <Button
                  key={K}
                  onClick={row.onClick}
                  variant={"outline"}
                  className={
                    "bg-white text-primary border-primary hover:text-primary"
                  }
                >
                  <HiPlus />
                  {row.label}
                </Button>
              );
            }

            if (row.type == "edit") {
              return (
                <Button
                  onClick={row.onClick}
                  variant={"outline"}
                  className={
                    "bg-white text-primary border-primary hover:text-primary"
                  }
                >
                  <HiPencil />
                  {row.label}
                </Button>
              );
            }

            if (row.type == "cancel") {
              return (
                <Button
                  className="border-primary text-primary bg-white hover:text-primary"
                  variant={"outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (row.onClick) {
                      row.onClick();
                    }
                  }}
                >
                  <X />
                  Batal
                </Button>
              );
            }
            if (row.type == "save") {
              return (
                <Button
                  disabled={row.isDisabled}
                  className="border-primary text-white bg-primary hover:text-white hover:bg-primary/80"
                >
                  <Save />
                  Save
                </Button>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default ButtonTitleGroup;
