import FormSuratBebasPustaka from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratBebasPustaka/components/form.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  ResolverSBP,
  type TResolverSBP,
} from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratBebasPustaka/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseLetterDetailSKBP } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBP/hook.tsx'
import { format } from 'date-fns'

const UpdatedSuratBebasPustakaPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { letter } = UseLetterDetailSKBP(id as string)
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SKBP-1')

  const form = useForm<TResolverSBP>({
    resolver: zodResolver(ResolverSBP),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
      ketentuan_bebas_pustaka: [''],
      tujuan_pembuatan_surat: [''],
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

  const HandleSave = async (value: TResolverSBP) => {
    setLoading(true)
    await AxiosClient.put(
      `/eoffice/mail-surat-bebas-pustaka/${letter?.id_mail_surat_bebas_pustaka}`,
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
      <FormSuratBebasPustaka
        template={template}
        form={form}
        loading={loading}
        HandleSave={HandleSave}
      />
    </>
  )
}

export default UpdatedSuratBebasPustakaPage
