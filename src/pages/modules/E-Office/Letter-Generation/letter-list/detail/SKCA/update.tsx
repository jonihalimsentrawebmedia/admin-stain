import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { UseLetterDetailSKCA } from './hooks.tsx'
import {
  ResolverSKCAM,
  type TResolverSKCAM,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganCutiAkademik/data/resolver.tsx'
import FormSuratKeteranganCutiAkademik from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganCutiAkademik/components/form.tsx'

const UpdateSuratKeteranganCutiAkademikPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SKAM-1')
  const navigate = useNavigate()
  const { id } = useParams()
  const { letter } = UseLetterDetailSKCA(id as string)

  const form = useForm<TResolverSKCAM>({
    resolver: zodResolver(ResolverSKCAM),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...letter,
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

  const HandleSave = async (value: TResolverSKCAM) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-keterangan-aktif-mahasiswa/${letter?.id_mail_surat_keterangan_cuti_akademik}`,
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
      <FormSuratKeteranganCutiAkademik
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdateSuratKeteranganCutiAkademikPage
