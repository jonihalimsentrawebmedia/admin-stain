import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Button } from '@/components/ui/button.tsx'

export const ButtonsModals = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal 1</Button>

      <DialogBasic className={'lg:min-w-4xl'} title={'Modal 1'} open={open} setOpen={setOpen}>
        <div className={'h-[500px]'}>
          <button onClick={() => setOpen2(!open2)}>Modal2</button>
        </div>
      </DialogBasic>
      <DialogBasic title={'Modal 2'} open={open2} setOpen={setOpen2}>
        modal 2
      </DialogBasic>
    </>
  )
}
