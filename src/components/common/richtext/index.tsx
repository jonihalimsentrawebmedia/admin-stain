import { useCallback } from 'react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor.tsx'
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  required?: boolean
  className?: string
  labelClassName?: string
  isRow?: boolean
  showLabel?: boolean
  placeholder?: string
}

export const RichText = <T extends FieldValues>(props: Props<T>) => {
  const {
    form,
    name,
    label,
    required,
    className,
    isRow = true,
    showLabel = true,
    labelClassName,
    placeholder,
  } = props

  const fieldValue = useWatch({ control: form.control, name })

  const handleChange = useCallback(
    (value: string) => {
      form.setValue(name, value as PathValue<T, Path<T>>)
    },
    [form, name]
  )

  const error = form.formState.errors[name]
  const errorMessage = error?.message as string | undefined

  return (
    <div
      className={`${isRow ? 'grid grid-cols-[12rem_1fr]' : 'flex flex-col w-full'} w-full gap-5 items-start ${className}`}
    >
      {showLabel && (
        <label className={`${error ? 'text-red-500' : ''} ${labelClassName}`}>
          {label ?? 'Keterangan (Optional)'}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className={'w-full'}>
        <SimpleEditor
          name={name}
          value={fieldValue ?? ''}
          onchange={handleChange}
          placeholder={placeholder}
        />
        {error && <span className={'text-red-500'}>{errorMessage}</span>}
      </div>
    </div>
  )
}
