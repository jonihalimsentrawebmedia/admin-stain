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
import { UseGetManagementEditorNewsDetail } from '../hooks/index'

export const NewsManagementEditorUpdated = () => {
  const { id } = useParams()
  const { managementEditorNewsDetail } = UseGetManagementEditorNewsDetail(id ?? '')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  useEffect(() => {
    if (managementEditorNewsDetail) {
      const temp: any[] = []
      managementEditorNewsDetail?.berita_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: managementEditorNewsDetail?.gambar,
        id_kategori_berita: managementEditorNewsDetail?.id_kategori_berita,
        judul: managementEditorNewsDetail?.judul,
        isi_berita: managementEditorNewsDetail?.isi_berita,
        keterangan_gambar: managementEditorNewsDetail?.keterangan_gambar,
        penulis: managementEditorNewsDetail?.penulis,
        berita_gambar_tambahan: temp,
      })
    }
  }, [managementEditorNewsDetail])

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/editor/berita/${id}`, e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berita berhasil dibuat')
          setLoading(false)
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
      <FormNewsContent loading={loading} form={form} HandleSave={HandleSubmit} />
    </>
  )
}
