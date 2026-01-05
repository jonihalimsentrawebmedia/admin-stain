import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { useMobile } from '@/utils/useMobile.tsx'

interface Props<T extends FieldValues> {
  label: string
  form: UseFormReturn<T>
  name: Path<T>
  className?: string
  isRow?: boolean
  isRequired?: boolean
  htmlFor?: string
  inputClassName?: string
  disabled?: boolean
}

export const SwitchInput = <T extends FieldValues>(props: Props<T>) => {
  const { label, isRow, className, form, name, isRequired, htmlFor, inputClassName, disabled } =
    props
  const { isMobile } = useMobile()

  return (
    <>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem
            className={`whitespace-nowrap
          ${isRow ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] flex-row items-center gap-5'} ` : 'flex flex-col gap-2'}
          ${className}`}
          >
            <FormLabel className="whitespace-pre-line text-gray-600" htmlFor={htmlFor}>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>

            <FormControl>
              <Switch
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
                id={htmlFor}
                disabled={disabled}
                className={`focus-visible:ring-0 ${inputClassName}`}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
