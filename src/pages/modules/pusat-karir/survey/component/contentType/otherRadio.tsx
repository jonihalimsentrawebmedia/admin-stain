import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useMobile } from '@/utils/useMobile.tsx'

interface RadioItem {
  value: string
  label: string
  isText?: boolean
}

interface InputRadioProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  text_value?: Path<T>
  label?: string | ReactNode
  className?: string
  isDisabled?: boolean
  isRow?: boolean
  data: RadioItem[]
  styleForm?: CSSProperties
  isRequired?: boolean
}

export function OtherInputRadio<T extends FieldValues>({
  form,
  label,
  name,
  text_value,
  className,
  isDisabled,
  isRow,
  data,
  styleForm,
  isRequired,
}: InputRadioProps<T>) {
  const { isMobile } = useMobile()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = field.value as string

        return (
          <FormItem
            className={clsx(
              isRow
                ? isMobile
                  ? 'flex flex-col gap-4'
                  : 'grid grid-cols-[12rem_1fr] items-start gap-5'
                : 'flex flex-col gap-2',
              className
            )}
            style={styleForm}
          >
            {label && (
              <FormLabel className="text-[#464646] font-normal">
                {label} {isRequired && <span className="text-red-500">*</span>}
              </FormLabel>
            )}

            <div className="flex flex-col gap-3">
              {data.map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <Input
                    type="radio"
                    id={item?.value}
                    value={item.value}
                    checked={selected === item.value}
                    onChange={() => field.onChange(item.value)}
                    disabled={isDisabled}
                    className="h-5 w-5 accent-primary"
                  />

                  <FormLabel htmlFor={item?.value}>{item.label}</FormLabel>

                  {item.isText && (
                    <FormField
                      control={form.control}
                      name={text_value as Path<T>}
                      render={({ field: textField }) => (
                        <Input
                          {...textField}
                          value={textField.value ?? ''}
                          placeholder="Isi lainnya..."
                          disabled={selected !== item.value}
                          className="w-full focus-visible:ring-0 border-x-0 !rounded-none border-t-0 shadow-none border-b-2"
                        />
                      )}
                    />
                  )}
                </div>
              ))}

              <FormMessage />
            </div>
          </FormItem>
        )
      }}
    />
  )
}
