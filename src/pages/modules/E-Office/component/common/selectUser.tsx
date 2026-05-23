'use client'

import { useMemo, useState } from 'react'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface Option {
  value: string
  label: string
  subLabel?: string
  initial?: string
}

interface Props<T extends FieldValues> {
  name: Path<T> // Ini penyebab error sebelumnya
  form: UseFormReturn<T>
  label?: string
  placeholder?: string
  data: Option[]
  isRequired?: boolean
}

export default function SelectUseRoleData<T extends FieldValues>({
  name,
  form,
  label = 'Pilih Pejabat',
  placeholder = 'Cari Pejabat...',
  data,
  isRequired = false,
}: Props<T>) {
  const [search, setSearch] = useState('')

  const selectedValues = (form.watch(name) || []) as string[]

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return data
    const term = search.toLowerCase().trim()
    return data.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(term))
    )
  }, [data, search])

  const toggleSelect = (value: string) => {
    const current = [...selectedValues]
    if (current.includes(value)) {
      form.setValue(name, current.filter((v) => v !== value) as any)
    } else {
      form.setValue(name, [...current, value] as any)
    }
  }

  const removeSelected = (value: string) => {
    const current = [...selectedValues]
    form.setValue(name, current.filter((v) => v !== value) as any)
  }

  return (
    <FormField
      name={name}
      control={form.control}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          {/* Selected Chips */}
          {selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedValues.map((value) => {
                const option = data.find((opt) => opt.value === value)
                return (
                  <div
                    key={value}
                    className="flex items-center gap-2 bg-gray-100 rounded-full pl-2 pr-3 py-1 text-sm border"
                  >
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                      {option?.initial || option?.label?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{option?.label}</p>
                      {option?.subLabel && (
                        <p className="text-xs text-gray-500">{option.subLabel}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelected(value)}
                      className="ml-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Search Input */}
          <div className="relative">
            <Input
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
          </div>

          {/* Options List */}
          <div className="mt-2 max-h-72 overflow-auto border rounded-lg bg-white divide-y">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <div
                    key={option.value}
                    onClick={() => toggleSelect(option.value)}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                      {option.initial || option.label?.[0]}
                    </div>
                    <div>
                      <p className="font-medium">{option.label}</p>
                      {option.subLabel && (
                        <p className="text-xs text-gray-500">{option.subLabel}</p>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-6 text-center text-gray-500">Pejabat tidak ditemukan</div>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
