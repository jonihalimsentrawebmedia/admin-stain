import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor.tsx'
import type { FieldValues, UseFormReturn, Path, PathValue } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
}

export const RichText = <T extends FieldValues>({ form, name }: Props<T>) => {
  return (
    <div className="grid grid-cols-[12rem_1fr] gap-5 items-start">
      <label>Keterangan (Optional)</label>

      <SimpleEditor
        value={form.watch(name) ?? ''}
        onchange={(e) => {
          form.setValue(name, e as PathValue<T, Path<T>>)
        }}
      />
    </div>
  )
}
