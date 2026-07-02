import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import FormSuratPengantarKKN from './components/form.tsx'
import { ResolverKKN, type TResolverKKN } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SuratPengantarKKN = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SPK-1')

  const form = useForm<TResolverKKN>({
    resolver: zodResolver(ResolverKKN),
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverKKN) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-pengantar-kkn`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
      tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
    })
      .then((res) => {
        if (res?.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          form.reset()
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
      <FormSuratPengantarKKN
        form={form}
        loading={loading}
        HandleSave={HandleSave}
        template={template}
      />
    </>
  )
}

export default SuratPengantarKKN
