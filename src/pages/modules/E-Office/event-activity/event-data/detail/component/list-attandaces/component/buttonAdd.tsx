import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

const ButtonAddAttendance = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary text-primary rounded-full'}
        onClick={() => setOpen(!open)}
      >
        Tambah Daftar Hadir
      </Button>

      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <div></div>
      </DialogBasic>
    </>
  )
}
export default ButtonAddAttendance
