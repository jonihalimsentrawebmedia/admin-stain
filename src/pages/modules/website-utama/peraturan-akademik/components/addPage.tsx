import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import { Accordion } from '@/components/ui/accordion.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import {
  AcademicRuleResolver,
  type IAcademicRules,
} from '@/pages/modules/website-utama/peraturan-akademik/types/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadFileInput } from '@/components/common/form/uploadFileInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { UseGetDetailAcademicRules } from '../hooks/index'

export const AddPageAcademicRule = () => {
  const [loading, setLoading] = useState(false)
  const { academicRules: data } = UseGetDetailAcademicRules()

  useEffect(() => {
    if (data) {
      form.reset({
        isi: data?.isi ?? '',
        pengantar: data?.pengantar ?? '',
        penutup: data?.penutup ?? '',
        dokumen_teks_pengantar: data?.dokumen_teks_pengantar ?? '',
        dokumen_status_url: data?.dokumen_status_url ?? '',
        dokumen_status_key: data?.dokumen_status_key ?? '',
      })
    }
  }, [data])

  const form = useForm<IAcademicRules>({
    resolver: zodResolver(AcademicRuleResolver),
  })

  const navigate = useNavigate()

  const HandleSave = async (value: IAcademicRules) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/pengaturan-akademik', value)
      .then((res) => {
        if (res.data.status) {
          navigate('/modules/website-utama/academic-rules')
          toast.success(res?.data?.message || 'Berhasil menambahkan data')
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5 mt-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Peraturan Akademik'}
            isBack
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />

          <Accordion
            className={'flex flex-col gap-5'}
            type={'multiple'}
            defaultValue={['pengantar', 'isi', 'penutup', 'dokumen']}
          >
            <AccordionCustom name={'pengantar'} title={'Pengantar'}>
              <RichText form={form} name={'pengantar'} label={'Pengantar'} isRow required />
            </AccordionCustom>
            <AccordionCustom name={'isi'} title={'Isi'}>
              <RichText form={form} name={'isi'} label={'Isi'} isRow required />
            </AccordionCustom>
            <AccordionCustom name={'penutup'} title={'Penutup'}>
              <RichText form={form} name={'penutup'} label={'Penutup'} isRow required />
            </AccordionCustom>
            <AccordionCustom
              name={'dokumen'}
              title={'Dokumen'}
              contentClassName={'flex flex-col gap-4'}
            >
              <RichText
                form={form}
                name={'dokumen_teks_pengantar'}
                label={'Teks Pengantar'}
                isRow
                required
              />
              <UploadFileInput
                form={form}
                name={'dokumen_status_url'}
                keyname={'dokumen_status_key'}
                label={'Dokumen Status'}
                required
                isRow
              />
            </AccordionCustom>
          </Accordion>

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => {
                  navigate(-1)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
