import FormSuratPermohonanMagangPKL from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/components/form.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverLetterPKL,
  type TResolverLetterPKL,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSPM } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM/hook.tsx'
import { format } from 'date-fns'

const UpdatedSuratPermohonanMagangPKL = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { letter } = UseLetterDetailSPM(id as string)
  const { template } = UseGetTemplateByCodeLetter('SPM-1')
  const form = useForm<TResolverLetterPKL>({
    resolver: zodResolver(ResolverLetterPKL),
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        tanggal_mulai: format(letter?.tanggal_mulai, 'yyyy-MM-dd'),
        tanggal_selesai: format(letter?.tanggal_selesai, 'yyyy-MM-dd'),
        id_mahasiswa: letter?.id_mahasiswa ?? [],
      })
    }
  }, [letter])

  console.log(form.watch('id_mahasiswa'))

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverLetterPKL) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-permohonan-magang/${letter?.id_mail_surat_permohonan_magang}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        tanggal_mulai: new Date(value.tanggal_mulai).toISOString(),
        tanggal_selesai: new Date(value.tanggal_selesai).toISOString(),
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
      <FormSuratPermohonanMagangPKL
        template={template}
        loading={loading}
        form={form}
        HandleSave={HandleSave}
        studentList={letter?.mahasiswa_list ?? []}
      />
    </>
  )
}

export default UpdatedSuratPermohonanMagangPKL
