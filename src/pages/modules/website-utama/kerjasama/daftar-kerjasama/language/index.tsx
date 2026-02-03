import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetCollaborationLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageCollaboration } from './component/form'

export const CollaborationLanguagePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { language: detail } = UseGetCollaborationLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        nama_mitra: data?.nama_mitra,
        detail_kerjasama: data?.detail_kerjasama,
        manfaat_untuk_mitra: data?.manfaat_untuk_mitra,
        manfaat_untuk_univ: data?.manfaat_untuk_univ,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/bidang-kerjasama-translate/${id}`, {
      language: language,
      nama_mitra: e?.nama_mitra,
      detail_kerjasama: e?.detail_kerjasama,
      manfaat_untuk_mitra: e?.manfaat_untuk_mitra,
      manfaat_untuk_univ: e?.manfaat_untuk_univ,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/kerjasama/bidang-kerjasama')
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
      element: <FormLanguageCollaboration loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: <FormLanguageCollaboration loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: <FormLanguageCollaboration loading={loading} form={form} HandleSave={HandleSave} />,
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: <FormLanguageCollaboration loading={loading} form={form} HandleSave={HandleSave} />,
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
