import { useNavigate, useParams } from 'react-router-dom'
import { UseGetNewsLanguage } from '@/pages/modules/website-utama/public-content/news/language/hooks'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { FormLanguageNews } from '@/pages/modules/website-utama/public-content/news/language/component/form.tsx'

export const NewsWithLanguage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { newsLanguage } = UseGetNewsLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (newsLanguage) {
      const data = newsLanguage[language as 'id']
      form.reset({
        gambar: data?.gambar,
        id_kategori_berita: data?.id_kategori_berita,
        judul: data?.judul,
        isi_berita: data?.isi_berita,
        keterangan_gambar: data?.keterangan_gambar,
        penulis: data?.penulis,
        berita_gambar_tambahan: data?.berita_gambar_tambahan,
      })
    }
  }, [newsLanguage, language])

  const HandleSubmit = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/lembaga/berita-translate/${id}`, {
      language: language,
      judul: e?.judul,
      isi_berita: e?.isi_berita,
      keterangan_gambar: e?.keterangan_gambar,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-lembaga/public-content/news')
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  const tabsData = [
    {
      id: 1,
      name: 'Bahasa Indonesia',
      value: 'id',
      element: <FormLanguageNews loading={loading} form={form} HandleSave={HandleSubmit} />,
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: <FormLanguageNews loading={loading} form={form} HandleSave={HandleSubmit} />,
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: <FormLanguageNews loading={loading} form={form} HandleSave={HandleSubmit} />,
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: <FormLanguageNews loading={loading} form={form} HandleSave={HandleSubmit} />,
    },
  ]

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <TabsListCustom data={tabsData} value={language} onChange={setLanguage} />
      </div>
    </>
  )
}
