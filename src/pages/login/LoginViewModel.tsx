import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginViewModel = () => {
  const form = useForm();
  const [loading, setLoading] = useState(false);
  async function handleSave() {
    setLoading(true);
    setLoading(false);
  }
  return {
    loading,
    handleSave,
    form,
  };
};

export default LoginViewModel;
