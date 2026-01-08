import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select, { type StylesConfig } from 'react-select'

const primaryColor = 'hsl(var(--primary))'

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderColor: primaryColor, // hijau
    boxShadow: state.isFocused ? '0 0 0 1px #22c55e' : 'none',
    '&:hover': { borderColor: primaryColor },
    borderRadius: '8px',
    minHeight: '48px',
    paddingLeft: '4px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
    fontSize: '16px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#666',
    fontSize: '16px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: primaryColor, // hijau
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    // zIndex: 99,
  }),
}

interface Props {
  label: string
  loading?: boolean
  options: {
    value: string
    label: string
  }[]
  zIndex?: string
  name?: string
  selectClassName?: string
  fx?: (value: any) => void
}
const SelectFilter = ({
  label,
  zIndex,
  loading,
  options,
  name,
  selectClassName = 'min-w-xs',
  fx,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState()

  useEffect(() => {
    if (searchParams.get(name ?? '') || options.length !== 0) {
      const temp: any = options.filter((row) => row.value == searchParams.get(name ?? ''))
      setValue(temp)
      if (fx) {
        fx(temp.value)
      }
    }
  }, [options])

  return (
    <div className={`flex flex-col gap-1 relative ${zIndex}`}>
      <label
        className={`text-primary z-10 text-sm font-medium absolute ml-3 bg-white px-1 w-fit  -top-2.5`}
      >
        {label}
      </label>
      <Select
        isDisabled={loading}
        value={value}
        defaultValue={options[0]}
        options={[
          {
            value: '',
            label: 'Semua',
          },
          ...options,
        ]}
        styles={customStyles}
        className={`${selectClassName}`}
        placeholder="Pilih"
        onChange={(e: any) => {
          if (fx) {
            fx(e.value)
            return
          }
          if (name) {
            const newParams = new URLSearchParams(searchParams.toString())
            newParams.set(name, e.value)
            if (e.value === '') newParams.delete(name)
            setSearchParams(newParams)
            setValue(e)
          }
        }}
      />
    </div>
  )
}

export default SelectFilter
