import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TemplateSuratSchema, type TTemplateSuratForm } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FormTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/component/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailTemplateSurat } from '@/pages/modules/E-Office/reference/template-surat/hooks'

const UpdateTemplateSurat = () => {
  const { id } = useParams()
  const { templateSurat, loading: loadingDetail } = UseGetDetailTemplateSurat(id as string)
  const [loading, setLoading] = useState(false)

  const form = useForm<TTemplateSuratForm>({
    resolver: zodResolver(TemplateSuratSchema),
    defaultValues: {
      nama_template: '',
      deskripsi: '',
      section: [],
    },
  })

  useEffect(() => {
    if (templateSurat) {
      const mainData = templateSurat.templateSurat
      const sections = (templateSurat.sections ?? []).map((item) => ({
        judul_section: item.judul_section,
        konten_section: item.konten_section,
      }))

      form.reset({
        nama_template: mainData.nama_template,
        deskripsi: mainData.deskripsi,
        section: sections,
      })
    }
  }, [templateSurat])

  const navigate = useNavigate()
  const HandleSave = async (value: TTemplateSuratForm) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/template-surat/full/${id}`, value)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          toast.success(res?.data?.message || 'Berhasil mengupdate template surat')
          navigate('/modules/e-office/reference/template-surat')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengupdate template surat')
      })
  }

  const HandleLoading = loading || loadingDetail

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup isBack label={'Edit Template Surat'} buttonGroup={[]} />
        {loadingDetail ? (
          <div className="text-center py-10">Memuat data...</div>
        ) : (
          <FormTemplateSurat loading={HandleLoading} form={form} HandleSave={HandleSave} />
        )}
      </div>
    </>
  )
}

export default UpdateTemplateSurat
