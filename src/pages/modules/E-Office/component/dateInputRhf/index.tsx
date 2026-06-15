import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'
import type { GroupBase, StylesConfig } from 'react-select'
import Select from 'react-select'

interface DateInputProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: FieldPath<T>
  label: string
  disabled?: boolean
}

interface SelectOption {
  value: number
  label: string
}

const MONTHS: SelectOption[] = [
  { value: 0, label: 'Januari' },
  { value: 1, label: 'Februari' },
  { value: 2, label: 'Maret' },
  { value: 3, label: 'April' },
  { value: 4, label: 'Mei' },
  { value: 5, label: 'Juni' },
  { value: 6, label: 'Juli' },
  { value: 7, label: 'Agustus' },
  { value: 8, label: 'September' },
  { value: 9, label: 'Oktober' },
  { value: 10, label: 'November' },
  { value: 11, label: 'Desember' },
]

export const selectDateStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  control: (base, state) => ({
    ...base,
    minHeight: 46,
    backgroundColor: '#F8F7FD',
    borderColor: state.isFocused ? '#DCE2FB' : '#DCE2FB',
    borderRadius: 8,
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#DCE2FB',
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: '0 8px',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: '#888888',
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}

export function DateInputRHF<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: DateInputProps<T>) {
  const currentYear = new Date().getFullYear()

  const years = Array.from({ length: 100 }, (_, i) => ({
    value: currentYear - 50 + i,
    label: String(currentYear - 50 + i),
  }))

  console.log(form.watch(name))

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const value =
          (field.value as unknown) instanceof Date
            ? field.value
            : field.value
              ? new Date(field.value as string | number)
              : undefined

        const day = value?.getDate()
        const month = value?.getMonth()
        const year = value?.getFullYear()

        const daysInMonth =
          month !== undefined && year !== undefined ? new Date(year, month + 1, 0).getDate() : 31

        const days = Array.from({ length: daysInMonth }, (_, i) => ({
          value: i + 1,
          label: String(i + 1).padStart(2, '0'),
        }))

        const updateDate = (nextDay?: number, nextMonth?: number, nextYear?: number) => {
          const d = nextDay ?? day ?? 1
          const m = nextMonth ?? month ?? 0
          const y = nextYear ?? year ?? currentYear

          field.onChange(new Date(y, m, d))
        }

        return (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[12rem_1fr] gap-5 items-center">
              <label className="w-[200px] px-2 py-3 text-base">{label}</label>
              <div className="flex gap-4 flex-wrap">
                {/* Hari */}
                <Select<SelectOption, false>
                  styles={selectDateStyles}
                  isDisabled={disabled}
                  className="w-[150px]"
                  options={days}
                  value={days.find((x) => x.value === day) ?? null}
                  onChange={(option) => updateDate(option?.value, month, year)}
                />

                {/* Bulan */}
                <Select<SelectOption, false>
                  styles={selectDateStyles}
                  isDisabled={disabled}
                  className="w-[200px]"
                  options={MONTHS}
                  value={MONTHS.find((x) => x.value === month) ?? null}
                  onChange={(option) => updateDate(day, option?.value, year)}
                />

                {/* Tahun */}
                <Select<SelectOption, false>
                  styles={selectDateStyles}
                  isDisabled={disabled}
                  className="w-[150px]"
                  options={years}
                  value={years.find((x) => x.value === year) ?? null}
                  onChange={(option) => updateDate(day, month, option?.value)}
                />
              </div>
            </div>

            {fieldState.error && (
              <span className="ml-[200px] text-sm text-red-500">{fieldState.error.message}</span>
            )}
          </div>
        )
      }}
    />
  )
}
