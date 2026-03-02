import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseSatuanOrganisasiLanguage } from '../../controller/useGetSatuanOrganisasiLanguage'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { SatuanOrganisasiTranslateForm } from '../form/SatuanOrganisasiTranslateForm'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList'
interface Props {
  linkBack: string
  kelompok: string
}
const TabsLanguageSatuanOrganisasi = ({ linkBack, kelompok }: Props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language: detail } = UseSatuanOrganisasiLanguage(id ?? '')

  const [language, setLanguage] = useState('id')
  const [loading, setLoading] = useState(false)

  const form = useForm()

  useEffect(() => {
    if (detail) {
      const data = detail[language as 'id']
      form.reset({
        nama: data?.nama,
        singkatan: data.singkatan,
      })
    }
  }, [detail, language])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post(`/pengaturan/satuan-organisasi-translate/${id}`, {
      language: language,
      nama: e?.nama,
      singkatan: e?.singkatan,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          navigate(linkBack)
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
        <SatuanOrganisasiTranslateForm
          kelompok={kelompok}
          loading={loading}
          form={form}
          HandleSave={HandleSave}
        />
      ),
    },
    {
      id: 2,
      name: 'English',
      value: 'en',
      element: (
        <SatuanOrganisasiTranslateForm
          kelompok={kelompok}
          loading={loading}
          form={form}
          HandleSave={HandleSave}
        />
      ),
    },
    {
      id: 3,
      name: 'Mandarin',
      value: 'zh',
      element: (
        <SatuanOrganisasiTranslateForm
          kelompok={kelompok}
          loading={loading}
          form={form}
          HandleSave={HandleSave}
        />
      ),
    },
    {
      id: 4,
      name: 'Arabic',
      value: 'ar',
      element: (
        <SatuanOrganisasiTranslateForm
          kelompok={kelompok}
          loading={loading}
          form={form}
          HandleSave={HandleSave}
        />
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

export default TabsLanguageSatuanOrganisasi
