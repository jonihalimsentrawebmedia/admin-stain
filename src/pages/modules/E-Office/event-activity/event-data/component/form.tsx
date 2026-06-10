import type { UseFormReturn } from 'react-hook-form'
import type { Dispatch, SetStateAction } from 'react'
import type { TResolverEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

interface props {
  form: UseFormReturn<TResolverEvent>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  HandleSave: (e: TResolverEvent) => void
}

export const FormEvent = (props: props) => {
  const { form, open, setOpen, loading, HandleSave } = props
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <TextInput
            name={'nama_kegiatan'}
            form={form}
            label={'Nama Kegiatan'}
            placeholder={'Nama Kegiatan'}
            htmlFor={'nama_kegiatan'}
            isRequired
          />
          <TextInput
            name={'tanggal_mulai'}
            form={form}
            label={'Tanggal Mulai'}
            htmlFor={'Tanggal Mulai'}
            type={'date'}
            isRequired
          />
          <TextInput
            min={form.watch('tanggal_mulai')}
            name={'tanggal_selesai'}
            form={form}
            label={'Tanggal Selesai'}
            htmlFor={'Tanggal Selesai'}
            type={'date'}
            isRequired
          />
          <TextInput
            name={'waktu'}
            form={form}
            label={'Watu'}
            placeholder={'Waktu Kegiatan cth: 08.00 - 10.00 WIB'}
            htmlFor={'nama_kegiatan'}
            isRequired
          />
          <TextInput
            name={'tempat'}
            form={form}
            label={'Tempat'}
            placeholder={'Tempat'}
            htmlFor={'tempat'}
            isRequired
          />
          <TextInput
            name={'penyelenggara'}
            form={form}
            label={'Penyelenggara'}
            placeholder={'Penyelenggara'}
            htmlFor={'penyelenggara'}
            isRequired
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}
