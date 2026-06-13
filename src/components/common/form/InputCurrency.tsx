import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ReactNode } from 'react'
import { useMobile } from '@/utils/useMobile'

interface Props<T extends FieldValues> {
  label?: string | ReactNode
  name: Path<T>
  form: UseFormReturn<T>

  currency?: string // 🔥 NEW (IDR, USD, dll)
  locale?: string // 🔥 NEW (id-ID, en-US)
  fx?: (e: any) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  isDisabled?: boolean
  isRequired?: boolean
  isRow?: boolean
}

function formatCurrency(value: number, currency: string = 'IDR', locale: string = 'id-ID') {
  if (!value && value !== 0) return ''

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

function parseNumber(value: string): number {
  return Number(value.replace(/[^0-9]/g, '')) || 0
}

function CurrencyInput<T extends FieldValues>({
  label,
  name,
  form,
  currency = 'IDR',
  locale = 'id-ID',
  placeholder,
  className,
  inputClassName,
  isDisabled,
  fx,
  isRequired,
  isRow = false,
}: Props<T>) {
  const { isMobile } = useMobile()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const displayValue =
          field.value !== undefined && field.value !== null
            ? formatCurrency(field.value, currency, locale)
            : ''

        return (
          <FormItem
            className={`whitespace-nowrap 
            ${
              isRow
                ? `${
                    isMobile
                      ? 'flex flex-col gap-4'
                      : 'grid grid-cols-[12rem_1fr] items-center gap-5'
                  }`
                : 'flex flex-col gap-2'
            } 
            ${className}`}
          >
            <FormLabel className="text-gray-600 whitespace-pre-line">
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>

            <FormControl>
              <Input
                placeholder={placeholder || formatCurrency(0, currency, locale)}
                disabled={isDisabled}
                className={`w-full focus-visible:ring-0 rounded ${inputClassName}`}
                value={displayValue}
                onChange={(e) => {
                  const raw = e.target.value
                  const numberValue = parseNumber(raw)
                  field.onChange(numberValue)
                  if (fx) {
                    fx(numberValue)
                  }
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default CurrencyInput
