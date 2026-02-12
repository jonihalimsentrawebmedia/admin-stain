import { FormNewsContent } from '../components/form'
import { useForm } from 'react-hook-form'
import { type INewsTypeForm, NewsResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetNewsDetail } from '../hooks/index'

export const UpdatedNewsPage = () => {
  const { id } = useParams()
  const { detailNews } = UseGetNewsDetail(id ?? '')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  useEffect(() => {
    if (detailNews) {
      const temp: any[] = []
      detailNews?.berita_gambar_tambahan.map((row) => {
        temp.push({
          gambar: row.gambar,
          keterangan: row.keterangan,
        })
      })

      form.reset({
        gambar: detailNews?.gambar,
        id_kategori_berita: detailNews?.id_kategori_berita,
        judul: detailNews?.judul,
        isi_berita: detailNews?.isi_berita,
        keterangan_gambar: detailNews?.keterangan_gambar,
        penulis: detailNews?.penulis,
        berita_gambar_tambahan: temp,
      })
    }
  }, [detailNews])

  const HandleSubmit = async (e: INewsTypeForm) => {
    setLoading(true)

    await AxiosClient.put(`/lembaga/berita/${detailNews?.id_berita}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-lembaga/public-content/news')
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
