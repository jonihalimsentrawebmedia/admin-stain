import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LucideEye, LucideEyeClosed } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useMobile } from '@/utils/useMobile.tsx'

interface Props<T extends FieldValues> {
  label?: string | ReactNode
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'date'
    | 'number'
    | 'tel'
    | 'file'
    | 'time'
    | 'datetime-local'
    | 'color'
  htmlFor?: string
  name: Path<T>
  placeholder?: string
  form: UseFormReturn<T>
  className?: string
  inputClassName?: string
  isRow?: boolean
  accept?: string
  isDisabled?: boolean
  isRequired?: boolean
  isNumber?: boolean
  min?: number | string
  max?: number | string
  fx?: (e: any) => void
}

function TextInput<T extends FieldValues>({
  label,
  type = 'text',
  htmlFor,
  placeholder,
  name,
  min,
  max,
  form,
  className,
  isRequired,
  accept,
  inputClassName,
  fx,
  isNumber,
  isDisabled,
  isRow = false,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'

  const { isMobile } = useMobile()
  const hexaToHex = (hexa?: string) => {
    if (!hexa) return '#000000'

    const value = String(hexa)

    if (value.length >= 7) {
      return value.slice(0, 7)
    }

    return '#000000'
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`whitespace-nowrap
          ${
            isRow
              ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] items-center gap-5'}`
              : 'flex flex-col gap-2'
          }
          ${className ?? ''}`}
        >
          <FormLabel htmlFor={htmlFor} className="text-gray-600 whitespace-pre-line">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <div className="relative w-full">
              <Input
                id={htmlFor}
                min={min}
                max={max}
                accept={accept}
                disabled={isDisabled}
                placeholder={placeholder}
                onWheel={(e) => (e.target as HTMLElement).blur()}
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                className={`w-full rounded focus-visible:ring-0 ${inputClassName ?? ''}`}
                value={
                  type === 'color'
                    ? hexaToHex(field.value as string)
                    : field.value !== undefined && field.value !== null
                      ? String(field.value)
                      : ''
                }
                onChange={(e) => {
                  let value: any = e.target.value
                  if (type === 'color') {
                    field.onChange(hexaToHex(value))
                    return
                  }
                  if (isNumber) {
                    value = value === '' ? '' : Number(value)
                  }
                  if (fx) {
                    fx(value)
                  }
                  field.onChange(value)
                }}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <LucideEye className="h-5 w-5" />
                  ) : (
                    <LucideEyeClosed className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextInput
