import { ArrowLeft,  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className="flex gap-2 cursor-pointer  items-center font-medium text-primary"
    >
      <ArrowLeft />
      Kembali
    </button>
  );
};

export default ButtonBack;
