import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FormSuratPengantarObservasi from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi/components/form.tsx'
import { ResolverSPO, type TResolverSPO } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

const SuratPengantarObservasiPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SPO-1')
  const form = useForm<TResolverSPO>({
    resolver: zodResolver(ResolverSPO),
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const navigate = useNavigate()

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-pengantar-observasi`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      tanggal_observasi: new Date(value.tanggal_observasi).toISOString(),
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
      <FormSuratPengantarObservasi
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        template={template}
      />
    </>
  )
}
export default SuratPengantarObservasiPage
