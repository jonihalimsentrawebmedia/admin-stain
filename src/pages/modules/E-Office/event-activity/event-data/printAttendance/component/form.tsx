import {
  type ArrayPath,
  type FieldValues,
  useFieldArray,
  type UseFormReturn,
} from 'react-hook-form'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import TextInput from '@/components/common/form/TextInput'
import { toast } from 'react-toastify'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: ArrayPath<T>
  fieldBlock?: boolean
}

const FormMoreSignature = <T extends FieldValues>({ form, name, fieldBlock }: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  })

  const handleAdd = () => {
    append({
      label: '',
      jabatan: '',
      nama: '',
    } as any)
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="font-semibold">Tambahkan Penandatangan (Opsional)</h2>

        <Button
          type="button"
          variant="outline"
          className="mt-2 rounded-full border-primary text-primary"
          onClick={() => {
            fieldBlock
              ? handleAdd()
              : toast.error(
                  'Tidak bisa menambahkan penandatangan Ke 3 Jika Penanda tangan 2 Blum diisi'
                )
          }}
        >
          Tambah Penandatangan
        </Button>

        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-3 rounded-lg border p-4">
                <TextInput
                  form={form}
                  name={`${name}.${index}.label` as any}
                  label="Label"
                  placeholder="Label"
                  htmlFor={`label-${index}`}
                  isRow
                />

                <TextInput
                  form={form}
                  name={`${name}.${index}.nama` as any}
                  label="Nama"
                  placeholder="Nama"
                  htmlFor={`nama-${index}`}
                  isRow
                />

                <TextInput
                  form={form}
                  name={`${name}.${index}.jabatan` as any}
                  label="Jabatan"
                  placeholder="Jabatan"
                  htmlFor={`jabatan-${index}`}
                  isRow
                />

                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default FormMoreSignature
