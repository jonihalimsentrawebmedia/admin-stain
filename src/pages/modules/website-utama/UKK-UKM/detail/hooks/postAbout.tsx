import { useForm } from 'react-hook-form'
import {
  AboutResolver,
  type IAboutTypeForm,
} from '@/pages/modules/website-utama/program-studi/detail/model/about-resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const UsePostAboutUkkUkm = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const form = useForm<IAboutTypeForm>({
    resolver: zodResolver(AboutResolver),
  })

  const queryClient = useQueryClient()
  const handleSave = async (e: IAboutTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/ukk-ukm-tentang/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['about-ukk-ukm', id],
          })
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return {
    form,
    loading,
    handleSave,
  }
}
