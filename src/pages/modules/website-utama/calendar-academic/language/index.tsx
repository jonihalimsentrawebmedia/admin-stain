import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetYearAcademicLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageYearAcademic } from './component/form'

export const YearAcademicLanguagePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language: detail } = UseGetYearAcademicLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        nama_tahun_akademik: data?.nama_tahun_akademik,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/tahun-akademik-translate/${id}`, {
      language: language,
      nama_tahun_akademik: e?.nama_tahun_akademik,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/calendar-academic')
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
      element: <FormLanguageYearAcademic loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: <FormLanguageYearAcademic loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: <FormLanguageYearAcademic loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: <FormLanguageYearAcademic loading={loading} form={form} HandleSave={HandleSave} />,
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
