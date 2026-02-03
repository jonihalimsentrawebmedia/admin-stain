import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetTypeCollaborationLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageTypeCollaboration } from './component/form'

export const TypeCollaborationLanguagePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { language: detail } = UseGetTypeCollaborationLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        nama_jenis_kerjasama: data?.nama_jenis_kerjasama,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/jenis-kerjasama-translate/${id}`, {
      language: language,
      nama_jenis_kerjasama: e?.nama_jenis_kerjasama,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/kerjasama/jenis-kerjasama')
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
      element: (
        <FormLanguageTypeCollaboration loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: (
        <FormLanguageTypeCollaboration loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: (
        <FormLanguageTypeCollaboration loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: (
        <FormLanguageTypeCollaboration loading={loading} form={form} HandleSave={HandleSave} />
      ),
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
