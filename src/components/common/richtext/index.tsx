import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor.tsx'
import type { FieldValues, UseFormReturn, Path, PathValue } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  required?: boolean
}

export const RichText = <T extends FieldValues>(props: Props<T>) => {
  const { form, name, label, required } = props
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-5 items-start">
      <label>
        {label ?? 'Keterangan (Optional)'}
        {required && <span className="text-red-500">*</span>}
      </label>

      <SimpleEditor
        value={form.watch(name) ?? ''}
        onchange={(e) => {
          form.setValue(name, e as PathValue<T, Path<T>>)
        }}
      />
    </div>
  )
}
