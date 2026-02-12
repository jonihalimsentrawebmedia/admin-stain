import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pipette } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
export function getContrastTextColor(hex?: string) {
  if (!hex) return '#0F172A' // default gelap

  const sanitized = hex.replace('#', '')
  if (sanitized.length !== 6) return '#0F172A'

  const r = parseInt(sanitized.substring(0, 2), 16)
  const g = parseInt(sanitized.substring(2, 4), 16)
  const b = parseInt(sanitized.substring(4, 6), 16)

  // Relative luminance (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Threshold UI admin
  return luminance > 0.6 ? '#0F172A' : '#FFFFFF'
}

interface ColorPickerFieldProps {
  name: string
  title: string
  description?: string
  disabled?: boolean
}

export function ColorPickerField({ name, title, description, disabled }: ColorPickerFieldProps) {
  const { watch, setValue } = useFormContext()
  const value = watch(name)

  const [open, setOpen] = useState(false)
  const [tempColor, setTempColor] = useState(value)

  const [data] = useState({
    primary: '#297D56',
  })

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-lg">{title}</p>
      {description && (
        <p
          style={{
            color: data?.primary,
          }}
          className="text-sm"
        >
          {description}
        </p>
      )}

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-md border" style={{ backgroundColor: value }} />

        <div className="flex flex-col gap-2">
          <p className="font-medium">{value}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => {
              setTempColor(value)
              setOpen(true)
            }}
          >
            <Pipette className="mr-2 h-4 w-4" />
            Ganti Warna
          </Button>
        </div>
      </div>

      {/* Dialog Color Picker */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[260px] rounded-xl p-4">
          <p className="font-medium mb-2">Pilih Warna</p>

          <div
            className="w-full h-24 rounded-md border mb-3"
            style={{ backgroundColor: tempColor }}
          />

          <div className={'flex flex-col gap-1'}>
            <p className={'text-sm'}>{title}</p>
            <input
              type="color"
              value={tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              className="w-full h-8 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Input
              value={tempColor?.replace('#', '')}
              onChange={(e) => setTempColor(`#${e.target.value}`)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button
              type="button"
              style={{
                backgroundColor: data?.primary,
                color: getContrastTextColor(data?.primary),
              }}
              onClick={() => {
                setValue(name, tempColor, { shouldDirty: true })
                setOpen(false)
              }}
            >
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
