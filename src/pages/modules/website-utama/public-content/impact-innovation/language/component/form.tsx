import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { useNavigate } from 'react-router-dom'
import { RichText } from '@/components/common/richtext'
import TextInput from '@/components/common/form/TextInput.tsx'

interface Props {
  form: UseFormReturn<any>
  HandleSave: (e: any) => void
  loading: boolean
}

export const FormLanguageImpactInnovation = (props: Props) => {
  const { form, HandleSave, loading } = props
  const navigate = useNavigate()
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSave)} className={'flex flex-col gap-5 p-5'}>
          <ButtonTitleGroup
            label={'Tulis Inovasi Berdampak'}
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

          <TextInput
            name={'keterangan_gambar'}
            form={form}
            label={'Keterangan Gambar'}
            className={'items-start'}
            inputClassName={'bg-white'}
            placeholder={'Isi Keterangan Gambar'}
            isRequired
            isRow
          />

          <TextAreaInput
            name={'judul'}
            form={form}
            isRequired
            isRow
            label={'Judul Inovasi Berdampak'}
            className={'items-start'}
            inputClassName={'min-h-[8rem] bg-white'}
            placeholder={'Judul  Inovasi Berdampak'}
          />
          <RichText
            form={form}
            name={'isi_inovasi_berdampak'}
            label={'Isi Inovasi Berdampak'}
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
