import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select, { type StylesConfig } from 'react-select'

const primaryColor = 'hsl(var(--primary))'

const customStylesSelect: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    borderColor: primaryColor, // hijau
    boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : 'none',
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
    zIndex: 99,
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
  valueParam?: string
  isLabelTop?: boolean
}
const SelectFilter = ({
  label,
  zIndex,
  loading,
  options,
  name,
  selectClassName = 'min-w-xs',
  fx,
  valueParam,
  isLabelTop = false,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState()

  useEffect(() => {
    if (searchParams.get(name ?? '') || options.length !== 0) {
      const temp: any = options.filter((row) => row.value == searchParams.get(name ?? ''))
      setValue(temp)
    }
  }, [options])

  return (
    <div className="pt-4 relative">
      <div className={`flex  flex-col gap-1 ${isLabelTop ? '' : 'relative'} ${zIndex}`}>
        <label
          className={`text-primary z-5 text-sm font-medium absolute  bg-white px-1 w-fit  ${isLabelTop ? '-top-1' : '-top-2.5 ml-3'}`}
        >
          {label}
        </label>
        <Select
          isDisabled={loading}
          value={valueParam ? options.filter((item) => item.value == valueParam)[0] : value}
          defaultValue={options[0]}
          options={[
            {
              value: '',
              label: 'Semua',
            },
            ...options,
          ]}
          styles={customStylesSelect}
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
    </div>
  )
}

export default SelectFilter
