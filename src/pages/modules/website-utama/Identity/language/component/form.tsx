import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageIdentity = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Pengaturan Bahasa Tahun Akademik'}
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
                onClick: () => {},
              },
            ]}
          />

          <RichText form={form} name={'teks_pengantar'} label={'Teks Pengantar'} isRow required />
          <RichText form={form} name={'isi_nama'} label={'Isi Nama'} isRow required />
          <RichText form={form} name={'isi_kedudukan'} label={'Isi Kedudukan'} isRow required />
          <RichText form={form} name={'isi_berdiri'} label={'Isi Berdiri'} isRow required />
          <RichText
            form={form}
            name={'isi_busana_akademik'}
            label={'Isi Busana Akademik'}
            isRow
            required
          />
          <RichText form={form} name={'isi_lambang'} label={'Isi Lambang'} isRow required />
          <RichText form={form} name={'isi_bendera'} label={'Isi Bendera'} isRow required />
          <RichText form={form} name={'isi_mars_hymne'} label={'Isi Mars & Hymne'} isRow required />

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
                onClick: () => {},
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
