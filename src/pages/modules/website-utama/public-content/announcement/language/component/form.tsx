import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageAnnouncement = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Tulis Pengumuman'}
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

          <TextAreaInput
            name={'judul_pengumuman'}
            form={form}
            isRequired
            isRow
            label={'Judul Pengumuman'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Judul  Pengumuman'}
          />
          <RichText
            form={form}
            name={'isi_pengumuman'}
            label={'Isi Pengumuman'}
            required
          />
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
