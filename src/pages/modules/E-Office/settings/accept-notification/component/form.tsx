import type { UseFormReturn } from 'react-hook-form'
import type { TResolverAcceptNotification } from '../data/resolver'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'

interface props {
  form: UseFormReturn<TResolverAcceptNotification>
  loading: boolean
  open: boolean
  setOpen: (open: boolean) => void
  HandleSave: (e: TResolverAcceptNotification) => void
}

const FormAcceptNotification = (props: props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  const { humanResource } = UseGetHumanResource()

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <SelectBasicInput
            form={form}
            name={'id_sdm'}
            label={'Satuan Kerja'}
            placeholder={'Satuan Kerja'}
            isRequired
            data={
              humanResource?.map((row) => ({
                label: row?.nama,
                value: row?.id_sdm,
              })) ?? []
            }
          />

          <TextInput
            name={'email'}
            form={form}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            htmlFor={'email'}
            isRequired
          />
          <TextInput
            name={'telepon'}
            form={form}
            label={'Telepon'}
            placeholder={'Telepon'}
            type={'number'}
            htmlFor={'telepon'}
            isRequired
          />
          <TextInput
            name={'id_telegram'}
            form={form}
            label={'ID Telegram'}
            placeholder={'ID Telegram'}
            htmlFor={'id_telegram'}
            isRequired
          />
          <InputRadio
            form={form}
            name={'status'}
            label={'Status'}
            isRequired
            data={[
              { label: 'Aktif', value: true },
              { label: 'Tidak Aktif', value: false },
            ]}
          />

          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormAcceptNotification
