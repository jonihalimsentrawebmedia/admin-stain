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
import { UseGetLppmNewsDetail, } from '../hooks/index.tsx'
import { formatDate } from 'date-fns'

export const NewsLppmUpdated = () => {
  const { id } = useParams()
  const { lppmNewsDetail } = UseGetLppmNewsDetail(id ?? '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  useEffect(() => {
    if (lppmNewsDetail) {
      const temp: any[] = []
      lppmNewsDetail?.berita_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: lppmNewsDetail?.gambar,
        id_kategori_berita: lppmNewsDetail?.id_kategori_berita,
        judul: lppmNewsDetail?.judul,
        isi_berita: lppmNewsDetail?.isi_berita,
        keterangan_gambar: lppmNewsDetail?.keterangan_gambar,
        penulis: lppmNewsDetail?.penulis,
        tanggal_berita: formatDate(lppmNewsDetail?.tanggal_berita, 'yyyy-MM-dd'),
        berita_gambar_tambahan: temp,
      })
    }
  }, [lppmNewsDetail])

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/lppm/berita/${id}`, {
      ...e,
      tanggal_berita: new Date(e?.tanggal_berita).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berita berhasil dibuat')
          setLoading(false)
          navigate('/modules/lppmi/public-content/news')
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
