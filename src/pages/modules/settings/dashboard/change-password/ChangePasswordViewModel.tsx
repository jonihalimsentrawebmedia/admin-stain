import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ResetPasswordResolver, type ResetPasswordType } from './model'

const ChangePasswordViewModel = () => {
  const navigate = useNavigate()
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordResolver),
  })

  const [loading, setLoading] = useState(false)

  async function handleSave(data: ResetPasswordType) {
    setLoading(true)

    await AxiosClient.patch('/profil/ganti-password', {
      old_password: data.old_password,
      new_password: data.new_password,
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message)
          navigate(-1)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi Kesalahan')
      })

    setLoading(false)
  }

  const password = form.watch('new_password', '')

  // Validasi password
  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*]/.test(password),
  }
  const getClass = (valid: boolean) =>
    valid ? 'text-green-600 flex gap-2 items-center' : 'text-gray-400 flex gap-2 items-center'

  const isDisabled =
    !validations.length ||
    !validations.upper ||
    !validations.lower ||
    !validations.number ||
    !validations.symbol
  return {
    loading,
    handleSave,
    form,
    validations,
    getClass,
    isDisabled,
  }
}

export default ChangePasswordViewModel
