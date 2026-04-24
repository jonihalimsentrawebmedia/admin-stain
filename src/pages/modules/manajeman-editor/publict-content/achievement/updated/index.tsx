import { FormAchievement } from '@/pages/modules/website-utama/public-content/achievement/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { AchievementResolver, type AchievementType } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetAchievementDetail } from '../hooks/index'

export const UpdatedAchievementPage = () => {
  const { id } = useParams()
  const { detailAchievement: detail } = UseGetAchievementDetail(id ?? '')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form = useForm<AchievementType>({
    resolver: zodResolver(AchievementResolver),
  })

  useEffect(() => {
    if (detail) {
      form.reset({
        penulis: detail?.penulis,
        judul: detail?.judul,
        isi_konten: detail?.isi_konten,
        gambar: detail?.gambar,
        keterangan_gambar: detail?.keterangan_gambar,
        gambar_tambahan: detail?.gambar_tambahan,
      })
    }
  }, [detail])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put(`/editor/prestasi/${detail?.id_prestasi}`, e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data prestasi')
          navigate('/modules/editor/dashboard')
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
