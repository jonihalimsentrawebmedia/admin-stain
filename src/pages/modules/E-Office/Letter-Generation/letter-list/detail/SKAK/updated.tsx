import FormSuratKeteranganAktifKembali from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifKembali/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  ResolverSKAK,
  type TResolverSKAK,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifKembali/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKAK } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAK/hook.tsx'
import { format } from 'date-fns'

const UpdatedSuratKeteranganAktifKembaliPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { letter } = UseLetterDetailSKAK(id as string)
  const { template } = UseGetTemplateByCodeLetter('SKAK-1')

  const form = useForm<TResolverSKAK>({
    resolver: zodResolver(ResolverSKAK),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...(letter as any),
        tanggal_surat: format(letter?.tanggal_surat, 'yyyy-MM-dd'),
        prodi: letter?.nama_prodi,
        Fakultas: letter?.nama_fakultas,
        jenjang: letter?.nama_jenjang,
        semester: letter?.semester_masuk,
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverSKAK) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-keterangan-aktif-kembali/${letter?.id_mail_surat_keterangan_aktif_kembali}`,
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
      <FormSuratKeteranganAktifKembali
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdatedSuratKeteranganAktifKembaliPage
