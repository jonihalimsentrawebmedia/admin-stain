import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LevelCreateViewModel = () => {
  const navigate = useNavigate();
  const form = useForm();
  const [loading, setLoading] = useState(false);
  async function handleSave(values: any) {
    console.log(values);
    setLoading(false);
    setLoading(true);
  }

  function goToBack() {
    navigate(-1);
  }
  return {
    form,
    loading,
    handleSave,
    navigate,
    goToBack,
  };
};

export default LevelCreateViewModel;
