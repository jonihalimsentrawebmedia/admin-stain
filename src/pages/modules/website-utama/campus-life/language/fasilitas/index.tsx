import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetTextFacilitiesLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageTextFacilities } from './component/form'

export const TextFacilitiesLanguagePage = () => {
  const navigate = useNavigate()
  const { language: detail } = UseGetTextFacilitiesLanguage()

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        teks_pengantar: data?.teks_pengantar,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/kehidupan-kampus-fasilitas-translate`, {
      language: language,
      teks_pengantar: e?.teks_pengantar,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/campus-life?status=fasilitas')
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
      element: <FormLanguageTextFacilities loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: <FormLanguageTextFacilities loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: <FormLanguageTextFacilities loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: <FormLanguageTextFacilities loading={loading} form={form} HandleSave={HandleSave} />,
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
