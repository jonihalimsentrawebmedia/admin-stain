import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'

interface Props<T extends FieldValues> {
  label?: string
  htmlFor?: string
  name: Path<T>
  placeholder?: string
  form: UseFormReturn<T>
  className?: string
  inputClassName?: string
  isRow?: boolean
  isDisabled?: boolean
  isRequired?: boolean
}

const TextAreaInput = <T extends FieldValues>({
  label,
  htmlFor,
  placeholder,
  name,
  form,
  className,
  isDisabled,
  isRequired,
  inputClassName,
  isRow = false,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`
            ${isRow ? 'grid grid-cols-[12rem_1fr]' : 'flex'}
            ${isRow ? 'flex-row items-center gap-5' : 'flex-col gap-2'}
            whitespace-nowrap
            ${className}
          `}
        >
          <FormLabel className="whitespace-pre-line text-gray-600" htmlFor={htmlFor}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <Textarea
              {...field}
              disabled={isDisabled}
              value={field.value ?? ''}
              className={`focus-visible:ring-0 ${inputClassName}`}
              id={htmlFor}
              placeholder={placeholder}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextAreaInput
