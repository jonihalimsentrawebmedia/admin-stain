import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const OtpViewModel = () => {
    const navigate=useNavigate()
  const form = useForm();
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    setLoading(true);
    navigate(`/forget-password/change-password`)
    setLoading(false);
  }
  return {
    loading,
    handleSave,
    form,
  };
};

export default OtpViewModel;
