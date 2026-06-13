import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { type ReactNode, useEffect } from 'react'
import Select from 'react-select'
import { Skeleton } from '@/components/ui/skeleton'
import { BiX } from 'react-icons/bi'

interface Props<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  placeholder: string
  data: {
    value: string
    label: string | ReactNode
  }[]
  selectItemClassName?: string
  className?: string
  selectClassName?: string
  isRow?: boolean
  isDisabled?: boolean
  label?: string | ReactNode
  isLoading?: boolean
  isRequired?: boolean
  apiValue?: any
  fx?: (e: any) => void
  usePortal?: boolean
  icon?: ReactNode
  showNull?: boolean
  zIndex?: number
}

export const SelectIconInput = <T extends FieldValues>({
  name,
  form,
  placeholder,
  data,
  className = '',
  selectClassName = '',
  isDisabled = false,
  isRow = false,
  usePortal = false,
  showNull,
  isRequired,
  label,
  apiValue,
  isLoading,
  icon,
  zIndex = 9999,
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
              <div className={'flex rounded items-center w-full'}>
                <div className="p-2 border-2 bg-primary/30">{icon}</div>
                <Select
                  styles={{
                    menuPortal: (base) =>
                      usePortal ? { ...base, zIndex: zIndex, pointerEvents: 'auto' } : base,
                  }}
                  menuPosition={usePortal ? 'fixed' : 'absolute'}
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
                  classNamePrefix="react-select border-none!"
                  className={`min-h-10 z-20 w-full border-none! ${selectClassName}`}
                />
                {showNull && (
                  <BiX
                    className={'text-red-500 size-4'}
                    onClick={() => {
                      form.setValue(name, null as any)
                    }}
                  />
                )}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
