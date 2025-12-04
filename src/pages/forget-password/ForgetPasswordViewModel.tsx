import AxiosClient from "@/provider/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ForgetPasswordResolver, type ForgetPasswordType } from "./model";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const ForgetPasswordViewModel = () => {
  const navigate = useNavigate();
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(ForgetPasswordResolver),
  });
  const [loading, setLoading] = useState(false);
  async function handleSave(data: ForgetPasswordType) {
    setLoading(true);
    await AxiosClient.post("/auth/forgot-password", {
      ...data,
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
          Cookies.set("email", data.email, { expires: 1 });
          navigate(`/forget-password/otp`);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err?.response?.data?.message || "Terjadi Kesalahan");
      });

    setLoading(false);
  }
  return {
    loading,
    handleSave,
    form,
  };
};

export default ForgetPasswordViewModel;
