import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetIdentityLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageIdentity } from './component/form'

export const IdentityLanguagePage = () => {
  const navigate = useNavigate()
  const { language: detail } = UseGetIdentityLanguage()

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        teks_pengantar: data?.teks_pengantar,
        isi_nama: data?.isi_nama,
        isi_kedudukan: data?.isi_kedudukan,
        isi_berdiri: data?.isi_berdiri,
        isi_busana_akademik: data?.isi_busana_akademik,
        isi_lambang: data?.isi_lambang,
        isi_bendera: data?.isi_bendera,
        isi_mars_hymne: data?.isi_mars_hymne,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/identitas-translate`, {
      language: language,
      teks_pengantar: e?.teks_pengantar,
      isi_nama: e?.isi_nama,
      isi_kedudukan: e?.isi_kedudukan,
      isi_berdiri: e?.isi_berdiri,
      isi_busana_akademik: e?.isi_busana_akademik,
      isi_lambang: e?.isi_lambang,
      isi_bendera: e?.isi_bendera,
      isi_mars_hymne: e?.isi_mars_hymne,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/identity')
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
      element: <FormLanguageIdentity loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: <FormLanguageIdentity loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: <FormLanguageIdentity loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: <FormLanguageIdentity loading={loading} form={form} HandleSave={HandleSave} />,
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
