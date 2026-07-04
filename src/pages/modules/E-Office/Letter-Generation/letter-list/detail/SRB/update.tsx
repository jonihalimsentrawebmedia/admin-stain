import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import FormSuratRekomendasiBeasiswa from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratRekomendasiBeasiswa/components/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import {
  ResolverSRB,
  type TResolverSRB,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratRekomendasiBeasiswa/data/resolver.tsx'
import { UseLetterDetailSRB } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SRB/hooks.tsx'
import { format } from 'date-fns'

const UpdateSuratRekomendasiBeasiswaPage = () => {
  const { id } = useParams()
  const { letter } = UseLetterDetailSRB(id as string)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SRB-1')
  const form = useForm<TResolverSRB>({
    resolver: zodResolver(ResolverSRB),
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
        ipk: Number(letter?.ipk) ?? '',
      })
    }
  }, [letter])

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const HandleSave = async (value: TResolverSRB) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-rekomendasi-beasiswa/${letter?.id_mail_surat_rekomendasi_beasiswa}`,
      {
        ...value,
        tanggal_surat: new Date(value.tanggal_surat).toISOString(),
        ipk: value.ipk.toString(),
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
      <FormSuratRekomendasiBeasiswa
        HandleSave={HandleSave}
        form={form}
        loading={loading}
        template={template}
      />
    </>
  )
}
export default UpdateSuratRekomendasiBeasiswaPage
