import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor.tsx'
import type { FieldValues, UseFormReturn, Path, PathValue } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  required?: boolean
  className?: string
  labelClassName?: string
  isRow?: boolean
  showLabel?: boolean
}

export const RichText = <T extends FieldValues>(props: Props<T>) => {
  const {
    form,
    name,
    label,
    required,
    className,
    isRow = true,
    labelClassName,
    showLabel = true,
  } = props
  return (
    <div
      className={`${isRow ? 'grid grid-cols-[12rem_1fr]' : 'flex flex-col w-full'} w-full gap-5 items-start ${className}`}
    >
      {showLabel && (
        <label className={`${form.formState.errors[name] ? 'text-red-500' : ''} ${labelClassName}`}>
          {label ?? 'Keterangan (Optional)'}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className={'w-full'}>
        <SimpleEditor
          name={name}
          value={form.watch(name) ?? ''}
          onchange={(e) => {
            form.setValue(name, e as PathValue<T, Path<T>>)
          }}
        />
        {form.formState.errors[name] && (
          <span className={'text-red-500'}>{form?.formState.errors[name].message as any}</span>
        )}
      </div>
    </div>
  )
}
