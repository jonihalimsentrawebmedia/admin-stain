import { useState } from 'react'
import { ProfileResolver, type ProfileType } from '../model'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const useUpdateProfile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<ProfileType>({
    resolver: zodResolver(ProfileResolver),
  })
  const queryClient = useQueryClient()
  async function handleSave(data: ProfileType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/profil`, data)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['profile'],
        })
        goToBack()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  function goToBack() {
    navigate(-1)
  }
  return {
    handleSave,
    loading,
    form,goToBack
  }
}

export default useUpdateProfile
