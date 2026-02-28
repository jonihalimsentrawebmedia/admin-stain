import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetArticleLppmDetail } from '../hooks'
import { ResolverArticle, type IResolverArticleType } from '../data/resolver'
import { FormArticleLppm } from '../components/form'

export const UpdatedArticleLppm = () => {
  const { id } = useParams()
  const { articleDetail: detail } = UseGetArticleLppmDetail(id ?? '')

  const form = useForm<IResolverArticleType>({
    resolver: zodResolver(ResolverArticle),
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        isi_artikel: detail?.isi_artikel,
        gambar: detail?.gambar,
        penulis: detail?.penulis,
        keterangan_gambar: detail?.keterangan_gambar,
        artikel_gambar_tambahan: detail?.artikel_gambar_tambahan,
      })
    }
  }, [detail])

  const HandleSave = async (e: IResolverArticleType) => {
    setLoading(true)

    await AxiosClient.put(`/lppm/artikel/${detail?.id_artikel}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data promosi')
          navigate('/modules/lppm/public-content/article')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormArticleLppm form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}
