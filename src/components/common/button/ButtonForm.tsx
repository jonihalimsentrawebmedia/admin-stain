import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  loading: boolean;
  onCancel?: () => void;
}
const ButtonForm = ({ loading, onCancel }: Props) => {
  const navigate = useNavigate();
  function goToBack() {
    navigate(-1);
  }
  return (
    <div className="flex gap-4 justify-end items-center">
      <Button
        className="border-primary text-primary bg-white hover:text-primary"
        variant={"outline"}
        onClick={(e) => {
          e.preventDefault();
          if (onCancel) {
            onCancel();
          } else {
            goToBack();
          }
        }}
      >
        <X />
        Batal
      </Button>
      <Button
     
        disabled={loading}
        className="border-primary text-white bg-primary hover:text-white hover:bg-primary/80"
      >
        <Save />
        Save
      </Button>
    </div>
  );
};

export default ButtonForm;
