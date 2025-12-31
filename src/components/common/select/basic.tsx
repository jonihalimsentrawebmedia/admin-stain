import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Label } from '@radix-ui/react-label'
import type { Dispatch, SetStateAction } from 'react'

interface Props {
  data: { label: string; value: string }[]
  placeholder?: string
  label?: string
  value?: string
  onChange?: Dispatch<SetStateAction<any>>
  className?: string
  innerClassName?: string
  isRow?: boolean
}

export const SelectBasic = (props: Props) => {
  const { data, placeholder, innerClassName, label, value, onChange, className, isRow } = props

  return (
    <>
      <div
        className={`flex flex-col gap-2 ${isRow ? 'flex-row' : 'flex-col'} items-center ${className}`}
      >
        <Label>{label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={`${innerClassName} lg:min-w-[12rem]`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item, k) => (
              <SelectItem key={k} value={item?.value}>
                {item?.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
