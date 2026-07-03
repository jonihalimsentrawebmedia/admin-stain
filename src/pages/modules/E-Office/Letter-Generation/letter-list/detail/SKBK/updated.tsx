import FormSuratKeteranganBebasKeuangan from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasKeuangan/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  ResolverSKBK,
  type TResolverSKBK,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasKeuangan/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKBK } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBK/hook.tsx'

const UpdatedSuratKeteranganBebasKeuanganPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { letter } = UseLetterDetailSKBK(id as string)
  const { template } = UseGetTemplateByCodeLetter('SKBK-1')

  const form = useForm<TResolverSKBK>({
    resolver: zodResolver(ResolverSKBK),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
      daftar_kewajiban_keuangan: [''],
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

  const HandleSave = async (value: TResolverSKBK) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-bebas-keuangan/${letter?.id_mail_surat_bebas_keuangan}`,
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
      <FormSuratKeteranganBebasKeuangan
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdatedSuratKeteranganBebasKeuanganPage
