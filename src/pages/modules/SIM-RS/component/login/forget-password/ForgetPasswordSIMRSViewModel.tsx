import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import {
  ForgetPasswordSIMRSResolver,
  type ForgetPasswordSIMRSType,
} from './model'

const ForgetPasswordSIMRSViewModel = () => {
  const navigate = useNavigate()
  const form = useForm<ForgetPasswordSIMRSType>({
    resolver: zodResolver(ForgetPasswordSIMRSResolver),
  })
  const [loading, setLoading] = useState(false)

  async function handleSave(data: ForgetPasswordSIMRSType) {
    setLoading(true)
    await AxiosClient.post('/simrs/auth/forgot-password', { email: data.email })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          Cookies.set('email', data.email, { expires: 1 })
          navigate('/sim-rs/forget-password/otp')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi Kesalahan')
      })
    setLoading(false)
  }

  return { loading, handleSave, form }
}

export default ForgetPasswordSIMRSViewModel
