import {useState} from "react";
import {useForm} from "react-hook-form";
import AxiosClient from "@/provider/axios.tsx";
import {LoginResolver, type LoginType} from "@/pages/login/data";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

const LoginViewModel = () => {

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginResolver)
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sameValue, setSameValue] = useState(false)

  async function handleSave(data: LoginType) {
    setLoading(true);
    if (sameValue) {
      await AxiosClient.post('/auth/login', {
        ...data
      }).then(res => {
        if (res?.data?.status) {
          navigate('/modules')
          Cookies.set('token', res?.data?.data?.token, {expires: 1})
        }
      }).catch(err => {
        console.log(err)
        setLoading(false);
        toast.error(err?.response?.data?.message || 'Terjadi Kesalahan')
      })
    } else {
      setLoading(false);
      toast.warning('Captcha Salah')
    }
  }

  return {
    loading,
    handleSave,
    form,
    setSameValue
  };
};

export default LoginViewModel;
