import AxiosClient from "@/provider/axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const OtpViewModel = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>()
  
  const [loading, setLoading] = useState(false);
  
  async function handleSave() {
    setLoading(true);
    await AxiosClient.post("/auth/otp", {
        otp: otp,
        email: Cookies.get("email"),
      })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
          navigate(`/forget-password/change-password`);
          Cookies.set('session',res?.data?.data)
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
    otp,
    setOtp
  };
};

export default OtpViewModel;
