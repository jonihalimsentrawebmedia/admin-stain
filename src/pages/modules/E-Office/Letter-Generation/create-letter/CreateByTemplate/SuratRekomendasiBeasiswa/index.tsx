import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import FormSuratRekomendasiBeasiswa from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratRekomendasiBeasiswa/components/form.tsx'
import { ResolverSRB, type TResolverSRB } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

const SuratRekomendasiBeasiswaPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SRB-1')
  const form = useForm<TResolverSRB>({
    resolver: zodResolver(ResolverSRB),
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverSRB) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-rekomendasi-beasiswa`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      ipk: value.ipk.toString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate(
            `/modules/e-office/letter-generation/letter-list?id_template=${template?.id_mail_jenis_template_surat}`
          )
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormSuratRekomendasiBeasiswa
        HandleSave={HandleSave}
        form={form}
        loading={loading}
        template={template}
      />
    </>
  )
}
export default SuratRekomendasiBeasiswaPage
