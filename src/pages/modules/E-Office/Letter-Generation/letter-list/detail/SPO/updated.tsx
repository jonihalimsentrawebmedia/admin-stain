import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import FormSuratPengantarObservasi from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi/components/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  ResolverSPO,
  type TResolverSPO,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi/data/resolver.tsx'
import { UseLetterDetailSPO } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPO/hook.tsx'
import { format } from 'date-fns'

const UpdatedSuratPengantarObservasiPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const { letter } = UseLetterDetailSPO(id as string)
  const { template } = UseGetTemplateByCodeLetter('SPO-1')
  const form = useForm<TResolverSPO>({
    resolver: zodResolver(ResolverSPO),
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        tanggal_observasi: format(letter?.tanggal_observasi, 'yyyy-MM-dd'),
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const navigate = useNavigate()

  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-pengantar-observasi/${letter?.id_mail_surat_pengantar_observasi}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_observasi: new Date(value.tanggal_observasi).toISOString(),
      }
    )
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
export default UpdatedSuratPengantarObservasiPage
