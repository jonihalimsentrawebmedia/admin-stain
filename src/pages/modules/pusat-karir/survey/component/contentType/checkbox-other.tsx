import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useMobile } from '@/utils/useMobile.tsx'

interface CheckboxItem {
  value: string
  label: string
  isText?: boolean
}

interface InputCheckboxProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  text_value?: Path<T>
  label?: string | ReactNode
  className?: string
  isDisabled?: boolean
  isRow?: boolean
  data: CheckboxItem[]
  styleForm?: CSSProperties
  isRequired?: boolean
}

export function OtherInputCheckbox<T extends FieldValues>({
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
}: InputCheckboxProps<T>) {
  const { isMobile } = useMobile()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected: string[] = field.value ?? []

        const toggleValue = (value: string) => {
          if (selected.includes(value)) {
            field.onChange(selected.filter((v) => v !== value))
          } else {
            field.onChange([...selected, value])
          }
        }

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
              {data.map((item) => {
                const checked = selected.includes(item.value)

                return (
                  <div key={item.value} className="flex items-center gap-3">
                    <Input
                      type="checkbox"
                      id={item.value}
                      checked={checked}
                      onChange={() => toggleValue(item.value)}
                      disabled={isDisabled}
                      className="h-5 w-5 accent-primary"
                    />

                    <FormLabel htmlFor={item.value}>{item.label}</FormLabel>

                    {item.isText && (
                      <FormField
                        control={form.control}
                        name={text_value as Path<T>}
                        render={({ field: textField }) => (
                          <Input
                            {...textField}
                            value={textField.value ?? ''}
                            placeholder="Isi lainnya..."
                            disabled={!checked}
                            className="w-full focus-visible:ring-0 border-x-0 !rounded-none border-t-0 shadow-none border-b-2"
                          />
                        )}
                      />
                    )}
                  </div>
                )
              })}

              <FormMessage />
            </div>
          </FormItem>
        )
      }}
    />
  )
}
