
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import {  useEffect, useState, type JSX, type ReactNode } from 'react'
import clsx from 'clsx'
import type { UseFormReturn } from 'react-hook-form'
import { useMobile } from '@/utils/useMobile'
import { Input } from './Input'



export function InputText({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
  isNumber,
  isFloat,
  isRow,
  defaultValue,
  inputClassName,
  onChange,
  isRupiah,
  minDate,
  onChangeFile,
  classNameLabel,
  isRequired,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  isRow?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'date'
    | 'file'
    | 'time'
    | 'email'
    | 'url'
    | 'datetime-local'
    | 'color'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  classNameLabel?: string
  isNumber?: boolean
  isFloat?: boolean
  defaultValue?: string
  inputClassName?: string
  onChange?: (value: string) => void
  onChangeFile?: (value: any) => void
  isRupiah?: boolean
  minDate?: string
  isRequired?: boolean
}) {
  const { isMobile } = useMobile()
  const [displayValue, setDisplayValue] = useState('')

  // Format nilai saat pertama kali render atau ketika nilai berubah dari luar
  useEffect(() => {
    if (isRupiah && isNumber && form?.getValues(name) !== undefined) {
      const value = form.getValues(name) || '0'
      const numValue =
        typeof value === 'string' ? parseFloat(value.replace(/[^\d]/g, '')) || 0 : value
      setDisplayValue(formatRupiah(numValue.toString()))
    }
  }, [form?.getValues(name), isRupiah, isNumber, name])

  const formatRupiah = (value: string) => {
    const num = parseFloat(value.replace(/[^\d]/g, '')) || 0
    return new Intl.NumberFormat('id-ID').format(num)
  }

  const parseRupiah = (value: string) => {
    return value.replace(/[^\d]/g, '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let rawValue = value

    if (isRupiah && isNumber) {
      rawValue = parseRupiah(value)
      value = formatRupiah(rawValue)
    } else if (isNumber) {
      rawValue = value.replace(/[^\d]/g, '')
      value = rawValue
    } else if (isFloat) {
      rawValue = value
        .replace(/[^0-9.\-]/g, '') // Hanya angka, titik, minus
        .replace(/(?!^)-/g, '') // Hapus semua minus kecuali di awal
        .replace(/(\..*?)\..*/g, '$1') // Satu titik desimal saja
      value = rawValue
    }

    // Update display value
    setDisplayValue(value)

    // Update form value (raw value tanpa format)
    if (form) {
      if (type !== 'file') {
        form.setValue(name, rawValue, { shouldValidate: true })
      }
    }

    if (onChange) {
      onChange(rawValue)
    }

    if (onChangeFile) {
      onChangeFile(e.target.files)
    }
  }

  const handleBlur = () => {
    if (isRupiah && isNumber && displayValue) {
      const numValue = parseFloat(parseRupiah(displayValue)) || 0
      setDisplayValue(formatRupiah(numValue.toString()))
    }
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx(
            `flex w-full `,
            {
              'flex-row items-center gap-8 ': isRow && !isMobile,
              'flex-col gap-0 ': !isRow || isMobile,
            },
            className
          )}
        >
          {label && (
            <FormLabel
              className={clsx(` text-wrap text-[#464646] font-normal`, {
                'w-full max-w-[200px]': isRow && label && !isMobile,
                hidden: isRow && !label,
                'w-full': isMobile,
                classNameLabel,
              })}
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div
            className={clsx('flex flex-col gap-3 bg-white rounded-lg', {
              'w-full': isMobile,
              'w-full phones:w-full': isRow && label && !isMobile,
            //   'w-full phones:w-full': isRow && !label && !isMobile,
            })}
          >
            <Input
              {...field}
              type={type === 'number' && (isRupiah || isNumber) ? 'text' : type}
              placeholder={placeholder}
              value={displayValue || field.value || ''}
              defaultValue={defaultValue}
              prefix={prefix}
              className={clsx(`text-[16px] h-12 ${inputClassName}`)}
              suffix={suffix}
              handlerClick={handlerClick}
              disabled={isDisabled}
              onChange={handleChange}
              onBlur={handleBlur}
              min={type != 'date' ? undefined : (minDate ?? undefined)}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
