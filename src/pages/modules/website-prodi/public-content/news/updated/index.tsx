import { FormNewsContent } from '@/pages/modules/website-utama/public-content/news/components/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  type INewsTypeForm,
  NewsResolver,
} from '@/pages/modules/website-utama/public-content/news/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetProdiNewsDetail } from '../hooks/index.tsx'

export const NewsProdiUpdated = () => {
  const { id } = useParams()
  const { prodiNewsDetail } = UseGetProdiNewsDetail(id ?? '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  useEffect(() => {
    if (prodiNewsDetail) {
      const temp: any[] = []
      prodiNewsDetail?.berita_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: prodiNewsDetail?.gambar,
        id_kategori_berita: prodiNewsDetail?.id_kategori_berita,
        judul: prodiNewsDetail?.judul,
        isi_berita: prodiNewsDetail?.isi_berita,
        keterangan_gambar: prodiNewsDetail?.keterangan_gambar,
        penulis: prodiNewsDetail?.penulis,
        berita_gambar_tambahan: temp,
      })
    }
  }, [prodiNewsDetail])

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/prodi/berita/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berita berhasil dibuat')
          setLoading(false)
          navigate('/modules/website-prodi/public-content/news')
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
