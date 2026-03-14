import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const BottonSelectTypeVacancy = () => {
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
        Buka Lowongan
      </Button>

      <DialogBasic
        className={'rounded min-w-xl'}
        open={open}
        setOpen={setOpen}
        title={'Buka Lowongan Sebagai'}
      >
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-4 border p-5 rounded">
            <RadioGroupItem value="internal" id="internal" className="size-5 [&_svg]:size-3" />
            <Label htmlFor="internal" className="flex flex-col gap-2 items-start">
              <p className="text-xl font-semibold">Internal</p>
              <p>
                Membuka lowongan pekerjaan yang dibuka didalam Sekolah Tinggi Agama Islam Negeri
                Mandailing Natal
              </p>
            </Label>
          </div>

          <div className="flex items-center gap-4 border p-5 rounded">
            <RadioGroupItem value="external" id="external" className="size-5 [&_svg]:size-3" />
            <Label htmlFor="external" className="flex flex-col gap-2 items-start">
              <p className="text-xl font-semibold">Eksternal / Mitra Kerja</p>
              <p>Membuka lowongan pekerjaan yang dibuka mengatasnamakan mitra kerja.</p>
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
                navigate(`add?type=${value}`)
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
