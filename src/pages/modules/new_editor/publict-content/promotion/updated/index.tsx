import { FormPromotionProdi } from '@/pages/modules/website-prodi/public-content/promotion/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { type IResolverPromotionType, ResolverPromotion } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetPromotionManagementEditorDetail } from '../hooks/index'

export const UpdatedPromotionManagementEditor = () => {
  const { id } = useParams()
  const { promotionDetail: detail } = UseGetPromotionManagementEditorDetail(id ?? '')

  const form = useForm<IResolverPromotionType>({
    resolver: zodResolver(ResolverPromotion),
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (detail) {
      form.reset({
        judul: detail?.judul,
        isi_promosi: detail?.isi_promosi,
        gambar: detail?.gambar,
        penulis: detail?.penulis,
        keterangan_gambar: detail?.keterangan_gambar,
        promosi_gambar_tambahan: detail?.promosi_gambar_tambahan,
      })
    }
  }, [detail])

  const HandleSave = async (e: IResolverPromotionType) => {
    setLoading(true)

    await AxiosClient.put(`/editor/promosi/${detail?.id_promosi}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data promosi')
          navigate('/modules/editor/public-content/promotion')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <FormPromotionProdi form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}
