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
import { UseGetUnitNewsDetail } from '../hooks/index.tsx'

export const NewsUnitUpdated = () => {
  const { id } = useParams()
  const { unitNewsDetail } = UseGetUnitNewsDetail(id ?? '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  useEffect(() => {
    if (unitNewsDetail) {
      const temp: any[] = []
      unitNewsDetail?.berita_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: unitNewsDetail?.gambar,
        id_kategori_berita: unitNewsDetail?.id_kategori_berita,
        judul: unitNewsDetail?.judul,
        isi_berita: unitNewsDetail?.isi_berita,
        keterangan_gambar: unitNewsDetail?.keterangan_gambar,
        penulis: unitNewsDetail?.penulis,
        berita_gambar_tambahan: temp,
      })
    }
  }, [unitNewsDetail])

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/unit/berita/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berita berhasil dibuat')
          setLoading(false)
          navigate('/modules/website-unit/public-content/news')
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
