import type { UseFormReturn } from 'react-hook-form'
import type { TResolverTopicSchedule } from '@/pages/modules/Pulsikom/training/list-training/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'

interface props {
  open: boolean
  setOpen: (value: boolean) => void
  HandleSave: (value: any) => void
  form: UseFormReturn<TResolverTopicSchedule>
  loading: boolean
}

export const FormTopicAndSchedule = (props: props) => {
  const { open, setOpen, loading, HandleSave, form } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'judul_topik_bahasan'}
            form={form}
            label={'Judul Topik'}
            placeholder={'Judul Topik Bahasan'}
            isRequired
            isRow
          />
          <TextAreaInput
            name={'deskripsi'}
            form={form}
            label={'Deskripsi'}
            placeholder={'Deskripsi'}
            isRequired
            isRow
          />
          <TextInput
            name={'tanggal_mulai_bahasan'}
            form={form}
            label={'Tanggal Mulai Bahasan'}
            type={'date'}
            isRequired
            isRow
          />
          <TextInput
            name={'tanggal_selesai_bahasan'}
            form={form}
            label={'Tanggal Selesai Bahasan'}
            type={'date'}
            isRequired
            isRow
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
