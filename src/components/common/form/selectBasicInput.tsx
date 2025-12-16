import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { type ReactNode, useEffect } from 'react'
import Select from 'react-select'
import { Skeleton } from '@/components/ui/skeleton'

interface Props<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  data: {
    value: string
    label: string | ReactNode | any
  }[]
  selectItemClassName?: string
  className?: string
  selectClassName?: string
  isRow?: boolean
  isDisabled?: boolean
  label?: string | ReactNode
  apiValue?: any
  isLoading?: boolean
  isRequired?: boolean
  fx?: (e: any) => void
  usePortal?: boolean
}

export const SelectBasicInput = <T extends FieldValues>({
  name,
  form,
  placeholder,
  data,
  className = '',
  selectClassName = '',
  isDisabled = false,
  isRow = false,
  apiValue,
  usePortal = false,
  isRequired,
  label,
  isLoading,
  fx,
}: Props<T>) => {
  useEffect(() => {
    if (apiValue && !form.getValues(name)) {
      form.setValue(name, apiValue, { shouldValidate: true })
    }
  }, [apiValue, form, name])

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        const selectedOption = data.find((opt) => opt.value === field.value) || null

        return (
          <FormItem
            className={`${className} ${
              isRow
                ? 'flex flex-col gap-4 lg:grid md:grid-cols-[12rem_1fr] lg:gap-5'
                : 'flex flex-col gap-0.5'
            }`}
          >
            {label && (
              <FormLabel className="text-gray-500 text-sm">
                {label}
                {isRequired && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            {isLoading ? (
              <Skeleton className="h-10 bg-gray-300" />
            ) : (
              <Select
                styles={{
                  menuPortal: (base) => (usePortal ? { ...base, zIndex: 9999 } : base),
                }}
                menuPortalTarget={usePortal ? document.body : undefined}
                isDisabled={isDisabled}
                options={data}
                value={selectedOption}
                placeholder={placeholder}
                onChange={(option) => {
                  field.onChange(option ? option.value : '')
                  if (fx) {
                    fx(option)
                  }
                }}
                classNamePrefix="react-select"
                className={`min-h-10 z-20 ${selectClassName}`}
              />
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
