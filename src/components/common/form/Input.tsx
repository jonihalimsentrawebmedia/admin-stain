import * as React from 'react'



import { cn } from '@/lib/utils'
import type { FieldError } from 'react-hook-form'
import { useFormField } from '@/components/ui/form'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  suffix?: React.ReactElement
  prefix?: React.ReactElement
  error?: FieldError | undefined
  handlerClick?: () => void
  onValueChange?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, suffix, prefix, handlerClick, onValueChange, ...props }, ref) => {
    const { error: errorSchema } = useFormField()

    return (
      <div className={cn('relative flex w-full')}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `grow rounded-md border border-gray-300 p-3 transition-all duration-300 file:border-0 file:bg-transparent file:font-medium focus:bg-[#F4F9F6] focus:border-primary focus:outline-none focus:ring-primary disabled:cursor-not-allowed  disabled:bg-[#CDCDCD]`,
            className,
            errorSchema && 'border-destructive text-destructive placeholder:text-destructive',
            error && 'border-destructive',
            prefix && 'pl-12 phones:pl-[64px]', // add left padding if prefix is present
            suffix && 'pr-12 phones:pr-[64px]' // add right padding if suffix is present
          )}
          onChange={onValueChange}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-4 hover:cursor-pointer"
            onClick={handlerClick}
          >
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
