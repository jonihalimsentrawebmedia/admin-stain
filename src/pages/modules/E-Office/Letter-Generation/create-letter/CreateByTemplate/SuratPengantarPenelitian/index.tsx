import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import FormSuratPengantarPenelitian from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarPenelitian/components/form.tsx'
import { ResolverSPP, type TResolverSPP } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SuratPengantarPenelitianPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SPP-1')
  const form = useForm<TResolverSPP>({
    resolver: zodResolver(ResolverSPP),
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const navigate = useNavigate()

  const HandleSave = async (value: TResolverSPP) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-pengantar-penelitian`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate('/modules/e-office/letter-generation/letter-list')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <FormSuratPengantarPenelitian
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default SuratPengantarPenelitianPage
