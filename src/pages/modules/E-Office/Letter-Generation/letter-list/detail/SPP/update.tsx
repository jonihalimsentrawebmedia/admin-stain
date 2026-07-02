import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { UseLetterDetailSPP } from './hooks.tsx'
import FormSuratPengantarPenelitian from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarPenelitian/components/form.tsx'
import {
  ResolverSPP,
  type TResolverSPP,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarPenelitian/data/resolver.tsx'

const UpdateSuratPengantarPenelitianPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SPP-1')
  const navigate = useNavigate()
  const { id } = useParams()
  const { letter } = UseLetterDetailSPP(id as string)

  const form = useForm<TResolverSPP>({
    resolver: zodResolver(ResolverSPP),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        prodi: letter?.nama_prodi ?? '',
        Fakultas: letter?.nama_fakultas ?? '',
        jenjang: letter?.nama_jenjang ?? '',
        semester: letter?.semester_masuk ?? '',
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverSPP) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-pengantar-penelitian/${letter?.id_mail_surat_pengantar_penelitian}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
      }
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          form.reset()
          navigate('/modules/e-office/letter-generation/letter-list')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  console.log(form.formState.errors)

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

export default UpdateSuratPengantarPenelitianPage
