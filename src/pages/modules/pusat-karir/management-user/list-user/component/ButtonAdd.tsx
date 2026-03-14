import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const BottonSelectTypeUser = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()

  const navigate = useNavigate()

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'text-primary border-primary hover:text-primary'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic
        className={'rounded min-w-xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah User Sebagai'}
      >
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-4 border p-5 rounded">
            <RadioGroupItem
              value="pencari-kerja"
              id="pencari-kerja"
              className="size-5 [&_svg]:size-3"
            />
            <Label htmlFor="pencari-kerja" className="flex flex-col gap-2 items-start">
              <p className="text-xl font-semibold">Pencari Kerja</p>
              <p>
                Menambah user sebagai pencari kerja. User dapat melamar ke pekerjaan yang tersedia
                di Pusat Karir.
              </p>
            </Label>
          </div>

          <div className="flex items-center gap-4 border p-5 rounded">
            <RadioGroupItem
              value="mitra-kerja"
              id="mitra-kerja"
              className="size-5 [&_svg]:size-3"
            />
            <Label htmlFor="mitra-kerja" className="flex flex-col gap-2 items-start">
              <p className="text-xl font-semibold">Mitra Kerja</p>
              <p>
                Menambah user sebagai mitra kerja. User dapat memposting lowongan pekerjaan di Pusat
                Karir.
              </p>
            </Label>
          </div>
        </RadioGroup>

        <div className="flex gap-2 items-center justify-end">
          <Button
            onClick={() => setOpen(!open)}
            variant={'outline'}
            className={'text-primary hover:text-primary border-primary'}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              if (!value) {
                toast.warning('Pilih salah satu jenis lowongan')
              } else {
                navigate(`${value}/add`)
              }
            }}
          >
            Lanjutkan
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
