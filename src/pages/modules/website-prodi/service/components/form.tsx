import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { ServiceProdiResolverType } from '@/pages/modules/website-prodi/service/data/resolver.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'

interface Props {
  form: UseFormReturn<ServiceProdiResolverType>
  loading: boolean
  open: boolean
  setOpen: (open: boolean) => void
  HandleSave: (e: ServiceProdiResolverType) => void
}

export const FormServiceProdi = (props: Props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  return (
    <Form {...form}>
      <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
        <TextInput
          name={'nama_layanan'}
          label={'Nama Layan'}
          placeholder={'Nama Layanan'}
          form={form}
          isRequired
          isRow
        />
        <TextInput
          form={form}
          name={'url_layanan'}
          label={'URL Layanan'}
          placeholder={'URL Layanan'}
          type={'url'}
          isRequired
          isRow
        />

        <InputRadio
          form={form}
          name={'tampil'}
          data={[
            { label: 'Aktif', value: 'Y' },
            { label: 'Tidak Aktif', value: 'N' },
          ]}
          label={'Status Tampil'}
          isRequired
          isRow
        />

        <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
      </form>
    </Form>
  )
}
