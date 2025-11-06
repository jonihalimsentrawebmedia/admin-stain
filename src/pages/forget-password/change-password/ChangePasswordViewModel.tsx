import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePasswordViewModel = () => {
  const navigate = useNavigate();
  const form = useForm();
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    setLoading(true);
    navigate(`/forget-password/success`);
    setLoading(false);
  }
  const password = form.watch("password", "");

  // Validasi password
  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*]/.test(password),
  };
  const getClass = (valid: boolean) =>
    valid ? "text-green-600 flex gap-2 items-center" : "text-gray-400 flex gap-2 items-center";
  return {
    loading,
    handleSave,
    form,
    validations,getClass
  };
};

export default ChangePasswordViewModel;
