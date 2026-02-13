import { FormNewsContent } from '@/pages/modules/website-utama/public-content/news/components/form.tsx'
import { useForm } from 'react-hook-form'
import { type INewsTypeForm, NewsResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreatedNewsPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)

    await AxiosClient.post('/website-utama/berita', {
      ...e,
      tanggal_berita: new Date(e.tanggal_berita).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-utama/public-content/news')
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormNewsContent loading={loading} form={form} HandleSave={HandleSubmit} />
    </>
  )
}
