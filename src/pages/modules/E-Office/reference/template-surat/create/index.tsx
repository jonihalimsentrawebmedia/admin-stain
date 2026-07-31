import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { TemplateSuratSchema, type TTemplateSuratForm } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { FormTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/component/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateTemplateSurat = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TTemplateSuratForm>({
    resolver: zodResolver(TemplateSuratSchema),
    defaultValues: {
      nama_template: '',
      deskripsi: '',
      section: [],
    },
  })

  const navigate = useNavigate()
  const HandleSave = async (value: TTemplateSuratForm) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/template-surat/full', value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Berhasil membuat template surat')
          navigate('/modules/e-office/reference/template-surat')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal membuat template surat')
      })
  }

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Buat Template Surat'} buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide valueGuide="E_OFFICE_REFERENCE" /> }]} />
        <FormTemplateSurat loading={loading} form={form} HandleSave={HandleSave} />
      </div>
    </>
  )
}

export default CreateTemplateSurat
