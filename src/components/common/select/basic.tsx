import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Label } from '@radix-ui/react-label'
import type { Dispatch, SetStateAction } from 'react'
import { BiX } from 'react-icons/bi'

interface Props {
  data: { label: string; value: string }[]
  placeholder?: string
  label?: string
  value?: string
  onChange?: Dispatch<SetStateAction<any>>
  className?: string
  innerClassName?: string
  isRow?: boolean
  showReset?: boolean
}

export const SelectBasic = (props: Props) => {
  const { data, placeholder, innerClassName, label, value, onChange, className, isRow, showReset } =
    props

  const HandleReset = () => {
    if (onChange) {
      onChange('')
    }
  }

  return (
    <>
      <div
        className={`flex flex-col gap-2 ${isRow ? 'flex-row' : 'flex-col'} items-center ${className}`}
      >
        <Label>{label}</Label>
        <div className="flex items-center gap-1.5">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={`${innerClassName} lg:min-w-[12rem]`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position={'item-aligned'}>
              {data.map((item, k) => (
                <SelectItem key={k} value={item?.value}>
                  {item?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showReset && <BiX onClick={HandleReset} className="cursor-pointer" />}
        </div>
      </div>
    </>
  )
}
