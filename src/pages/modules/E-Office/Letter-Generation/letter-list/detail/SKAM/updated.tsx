import FormSuratKeteranganAktifMahasiswa from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  ResolverSKAM,
  type TResolverSKAM,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { UseLetterDetailSKAM } from './hooks.tsx'

const UpdateSuratKeteranganAktifMahasiswaPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SKAM-1')
  const navigate = useNavigate()
  const { id } = useParams()
  const { letter } = UseLetterDetailSKAM(id as string)

  const form = useForm<TResolverSKAM>({
    resolver: zodResolver(ResolverSKAM),
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

  const HandleSave = async (value: TResolverSKAM) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-keterangan-aktif-mahasiswa/${letter?.id_mail_surat_keterangan_aktif_mahasiswa}`,
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
      <FormSuratKeteranganAktifMahasiswa
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdateSuratKeteranganAktifMahasiswaPage
