import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import FormSuratKeteranganCutiAkademik from './components/form.tsx'
import { ResolverSKCAM, type TResolverSKCAM } from './data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UseGetTemplateByCodeLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/hook'

const SuratKeteranganCutiAkademikPage = () => {
  const [loading, setLoading] = useState(false)
  const { template } = UseGetTemplateByCodeLetter('SKCA-1')
  const form = useForm<TResolverSKCAM>({
    resolver: zodResolver(ResolverSKCAM),
    defaultValues: {
      id_jenis_template_surat: template?.id_mail_jenis_template_surat,
    },
  })

  useEffect(() => {
    if (template) {
      form.setValue('id_jenis_template_surat', template?.id_mail_jenis_template_surat)
    }
  }, [template])

  const navigate = useNavigate()

  const HandleSave = async (value: TResolverSKCAM) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/mail-surat-keterangan-cuti-akademik`, {
      ...value,
      tanggal_surat: new Date(value.tanggal_surat).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          form.reset()
          toast.success(res.data.message || 'Success')
          navigate('/modules/e-office/letter-generation/letter-list')
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

export default SuratKeteranganCutiAkademikPage
