'use client'

import { useState } from 'react'

const colorsDef = [
  { value: '#FFC570', label: 'Orange' }, // Kuning/orange
  { value: '#9BD49E', label: 'Green' }, // Hijau
  { value: '#F88078', label: 'Red' }, // Merah
  { value: '#78ABF8', label: 'Blue' }, // Biru (default selected)
  { value: '#C7AC85', label: 'Brown' }, // Coklat
  { value: '#727272', label: 'Gray' }, // Abu-abu
]

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  label: string
  colors?: { value: string; label: string }[]
}

export default function ColorPicker({ value, onChange, label, colors }: ColorPickerProps) {
  const ColorsUse = colors ?? colorsDef
  const [selectedColor, setSelectedColor] = useState(value)

  const handleSelect = (color: string) => {
    setSelectedColor(color)
    onChange?.(color)
  }

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium text-gray-700 block">{label}</label>}

      <div className="flex items-center gap-3">
        {ColorsUse.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => handleSelect(color.value)}
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
              selectedColor === color.value
                ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                : 'ring-1 ring-gray-200 hover:ring-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            aria-label={color.label}
          />
        ))}
      </div>

      {selectedColor && <p className="text-xs text-gray-500 font-mono">{selectedColor}</p>}
    </div>
  )
}
