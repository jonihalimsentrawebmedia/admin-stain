import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import type { ReactNode } from 'react'

interface Props<T extends FieldValues> {
  label?: string | ReactNode
  name: Path<T>
  form: UseFormReturn<T>
  className?: string
  isDisabled?: boolean
  isRequired?: boolean
  fx?: () => void
}

function CheckboxInputBasic<T extends FieldValues>({
  label,
  name,
  form,
  className,
  fx,
  isDisabled = false,
  isRequired = false,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex items-center gap-2 ${className}`}>
          <FormControl>
            <Checkbox
              className={'mb-0 border border-primary size-5 bg-white'}
              id={name}
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                if (fx) {
                  fx()
                }
              }}
              disabled={isDisabled}
            />
          </FormControl>
          {label && (
            <FormLabel htmlFor={name} className="text-gray-600">
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CheckboxInputBasic
