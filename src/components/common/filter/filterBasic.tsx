import { useSearchParams } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import Select from 'react-select'

interface Props {
  label?: string
  placeholder: string
  data: { label: string; value: string }[]
  name: string
  className?: string
  selectClassName?: string
  onChange?: (value: string) => void
}

const FilterSelect = ({
  label,
  data,
  placeholder,
  name,
  className,
  selectClassName,
  onChange,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedValue = searchParams.get(name)
    ? data.find((d) => d.value === searchParams.get(name)) || null
    : null

  const handleSearchParams = (option: { value: string; label: string } | null) => {
    const newUrl = new URLSearchParams(searchParams)
    if (option?.value) {
      newUrl.set(name, option.value)
      setSearchParams(newUrl)
      onChange?.(option.value)
    } else {
      newUrl.delete(name)
      setSearchParams(newUrl)
      onChange?.('')
    }
  }

  return (
    <div className={`flex flex-col gap-3 min-w-fit ${className}`}>
      {label && <Label>{label}</Label>}
      <Select
        className={`min-w-[10rem] ${selectClassName}`}
        options={data}
        value={selectedValue}
        onChange={handleSearchParams}
        placeholder={placeholder}
        isClearable
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '0.2rem',
            borderColor: '#e5e7eb',
            boxShadow: 'none',
            '&:hover': { borderColor: '#d1d5db' },
          }),
        }}
      />
    </div>
  )
}

export default FilterSelect
