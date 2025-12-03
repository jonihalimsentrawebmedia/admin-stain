import AxiosClient from "@/provider/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { OtpResolver, type OtpType } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const OtpViewModel = () => {
  const navigate = useNavigate();
  const form = useForm<OtpType>({
    resolver: zodResolver(OtpResolver),
  });

  const [loading, setLoading] = useState(false);
  async function handleSave(data: OtpType) {
    setLoading(true);
    await AxiosClient.post("/auth/otp", {
      ...data,
      email: Cookies.get("email"),
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
          navigate(`/forget-password/change-password`);
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

export default OtpViewModel;
