import FormSuratKeteranganBebasAkademik from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasAkademik/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  ResolverSKBA,
  type TResolverSKBA,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasAkademik/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKBA } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBA/hook.tsx'

const UpdatedSuratKeteranganBebasAkademikPage = () => {
  const { id } = useParams()
  const { letter } = UseLetterDetailSKBA(id as string)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SKBA-1')

  const form = useForm<TResolverSKBA>({
    resolver: zodResolver(ResolverSKBA),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
      daftar_kewajiban_akademik: [''],
      tujuan_pembuatan_surat: [''],
    },
  })

  useEffect(() => {
    if (letter) {
      form.reset({
        ...letter,
        tanggal_surat: new Date(letter?.tanggal_surat).toISOString(),
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

  const HandleSave = async (value: TResolverSKBA) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-bebas-akademik/${letter?.id_mail_surat_bebas_akademik}`,
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
      <FormSuratKeteranganBebasAkademik
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdatedSuratKeteranganBebasAkademikPage
