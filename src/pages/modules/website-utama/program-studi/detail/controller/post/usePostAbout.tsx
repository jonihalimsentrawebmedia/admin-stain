import { useForm } from 'react-hook-form'
import { AboutResolver, type IAboutTypeForm } from '../../model/about-resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const usePostAbout = () => {
  const form = useForm<IAboutTypeForm>({
    resolver: zodResolver(AboutResolver),
  })
  const { id } = useParams()

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IAboutTypeForm) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/satuan-organisasi/${id}/tentang`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['program-studi-about'],
          })

          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah bidang kerjasama')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return {
    form,
    handleSave,
    loading,
  }
}

export default usePostAbout
