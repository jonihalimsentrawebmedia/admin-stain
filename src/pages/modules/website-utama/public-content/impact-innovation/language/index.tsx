import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UseGetImpactInnovationLanguage } from './hooks/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import { FormLanguageImpactInnovation } from './component/form'

export const ImpactInnovationLanguage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { impactInnovationLanguage } = UseGetImpactInnovationLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (impactInnovationLanguage) {
      const detail = impactInnovationLanguage[language as 'id']
      form.reset({
        judul: detail?.judul,
        isi_inovasi_berdampak: detail?.isi_inovasi_berdampak,
        keterangan_gambar: detail?.keterangan_gambar,
      })
    }
  }, [impactInnovationLanguage, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/website-utama/inovasi-berdampak-translate/${id}`, {
      language: language,
      judul: e?.judul,
      isi_inovasi_berdampak: e?.isi_inovasi_berdampak,
      keterangan_gambar: e?.keterangan_gambar,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate('/modules/website-utama/public-content/impact-innovation')
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
        <FormLanguageImpactInnovation loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: (
        <FormLanguageImpactInnovation loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: (
        <FormLanguageImpactInnovation loading={loading} form={form} HandleSave={HandleSave} />
      ),
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: (
        <FormLanguageImpactInnovation loading={loading} form={form} HandleSave={HandleSave} />
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
