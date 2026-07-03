import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormSuratPengantarKKN from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarKKN/components/form.tsx'
import {
  ResolverKKN,
  type TResolverKKN,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarKKN/data/resolver.tsx'
import { UseLetterDetailSPK } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPK/hook.tsx'
import { format } from 'date-fns'

const UpdatedSuratPengantarKKN = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { letter } = UseLetterDetailSPK(id as string)
  const { template } = UseGetTemplateByCodeLetter('SPK-1')
  const form = useForm<TResolverKKN>({
    resolver: zodResolver(ResolverKKN),
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        tanggal_mulai: format(letter?.tanggal_mulai, 'yyyy-MM-dd'),
        tanggal_selesai: format(letter?.tanggal_selesai, 'yyyy-MM-dd'),
        id_mahasiswa: letter?.id_mahasiswa ?? [],
        id_dpl: letter?.id_dpl ?? [],
      })
    }
  }, [letter])

  const HandleSave = async (value: TResolverKKN) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-pengantar-kkn/${letter?.id_mail_surat_pengantar_kkn}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
        tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
      }
    )
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

export default UpdatedSuratPengantarKKN
