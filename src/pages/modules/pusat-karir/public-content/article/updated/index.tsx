import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { CarrierArticleResolver, type IArticleCarrierResolver } from '../data/resolver'
import { FormArticleContent } from '../components/form'
import { UseGetCarrierArticleDetail } from '../hooks/index'

export const ArticleCarrierUpdated = () => {
  const { id } = useParams()
  const { unitNewsDetail: detail } = UseGetCarrierArticleDetail(id ?? '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<IArticleCarrierResolver>({
    resolver: zodResolver(CarrierArticleResolver),
  })

  useEffect(() => {
    if (detail) {
      const temp: any[] = []
      detail?.artikel_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: detail?.gambar,
        judul: detail?.judul,
        isi_artikel: detail?.isi_artikel,
        keterangan_gambar: detail?.keterangan_gambar,
        penulis: detail?.penulis,
        artikel_gambar_tambahan: temp,
      })
    }
  }, [detail])

  const HandleSubmit = async (e: IArticleCarrierResolver) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/artikel/${id}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Artikel berhasil dibuat')
          setLoading(false)
          navigate('/modules/pusat-karir/public-content/article')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormArticleContent loading={loading} form={form} HandleSave={HandleSubmit} />
    </>
  )
}
