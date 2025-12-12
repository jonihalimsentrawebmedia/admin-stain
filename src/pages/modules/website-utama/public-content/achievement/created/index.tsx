import { FormAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AchievementResolver, type AchievementType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreatedAchievementPage = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<AchievementType>({
    resolver: zodResolver(AchievementResolver),
  })

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/prestasi', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data prestasi')
          navigate('/modules/website-utama/public-content/achievement')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormAchievement loading={loading} form={form} HandleSave={HandleSave} />
    </>
  )
}
