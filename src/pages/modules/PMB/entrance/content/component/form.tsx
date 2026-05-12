import type { UseFormReturn } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { TResolverContent } from '@/pages/modules/PMB/entrance/content/data/resolver.tsx'
import { RichText } from '@/components/common/richtext'

interface Props {
  form: UseFormReturn<TResolverContent>
  loading: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  HandleSave: (e: TResolverContent) => void
}

export const FormContentEntrance = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <Form {...form}>
      <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
        <TextInput
          name={'judul_konten'}
          form={form}
          label={'Judul Konten'}
          placeholder={'Tuliskan Judul Konten'}
          isRequired
        />
        <TextInput
          name={'urutan'}
          form={form}
          label={'Urutan'}
          placeholder={'Urutan'}
          isRequired
          isNumber
          type={'number'}
        />
        <RichText form={form} name={'isi_konten'} label={'Isi Konten'} isRow={false} />

        <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
      </form>
    </Form>
  )
}
