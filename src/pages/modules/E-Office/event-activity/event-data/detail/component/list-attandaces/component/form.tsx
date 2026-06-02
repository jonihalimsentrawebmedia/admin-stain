import type { UseFormReturn } from 'react-hook-form'
import type { TResolverAttendance } from './resolver.tsx'
import { Form } from '@/components/ui/form.tsx'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { UseGetHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'

interface props {
  form: UseFormReturn<TResolverAttendance>
  loading: boolean
  open: boolean
  setOpen: (e: boolean) => void
  HandleSave: (e: TResolverAttendance) => void
}

const FormAttendance = (props: props) => {
  const { form, loading, open, setOpen, HandleSave } = props
  const {} = UseGetHumanResource()
  const {} = UseGetUnitInstitution()
  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <InputRadio
            form={form}
            name={'sumber_data'}
            data={['MANUAL', 'INTERNAL']?.map((row) => ({
              label: row?.toLowerCase(),
              value: row,
            }))}
          />
          <ButtonForm loading={loading} onCancel={() => setOpen(!open)} />
        </form>
      </Form>
    </>
  )
}

export default FormAttendance
