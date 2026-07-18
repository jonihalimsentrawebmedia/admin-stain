import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const OtpSIMRSViewModel = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>()
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await AxiosClient.post('/simrs/auth/otp', {
      otp,
      email: Cookies.get('email'),
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          navigate('/sim-rs/forget-password/change-password')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi Kesalahan')
      })
    setLoading(false)
  }

  return { loading, handleSave, otp, setOtp }
}

export default OtpSIMRSViewModel
