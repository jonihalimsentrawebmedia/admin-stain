import type { UseFormReturn } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import type { IAcademicYearTypeForm } from '../model/resolver'
import { InputRadio } from '@/components/common/form/InputRadio'

interface Props {
  form: UseFormReturn<IAcademicYearTypeForm>
  handleSave: (value: IAcademicYearTypeForm) => void
  handleCancel: () => void
  loading: boolean
}
const AcademicYearForm = ({ form, handleCancel, handleSave, loading }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <TextInput
            form={form}
            name="tahun_akademik"
            isNumber
            type="number"
            label="Tahun"
            placeholder="Tahun"
            isRow
          />
          <InputRadio
            data={[
              {
                label: 'Ganjil',
                value: 'GANJIL',
              },
              {
                label: 'Genap',
                value: 'GENAP',
              },
            ]}
            form={form}
            name="semester"
            isRow
            label="Semester"
          />
          <TextInput
            form={form}
            name="nama_tahun_akademik"
            label="Nama Tahun Akademik"
            placeholder="Nama Tahun Akademik"
            isRow
          />
          <ButtonForm loading={loading} onCancel={handleCancel} />
        </div>
      </form>
    </Form>
  )
}

export default AcademicYearForm
