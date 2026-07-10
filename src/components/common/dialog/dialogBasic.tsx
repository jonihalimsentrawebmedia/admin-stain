import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { clsx } from 'clsx'

interface Props {
  children: ReactNode
  title: string | ReactNode
  description?: string | ReactNode
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>> | any
  className?: string
  disableOutsideDialog?: boolean
}

export const DialogBasic = (props: Props) => {
  const {
    children,
    title,
    description,
    open,
    setOpen,
    className,
    disableOutsideDialog = false,
  } = props
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={clsx(className, 'overflow-y-auto w-full max-h-[85dvh] p-4 sm:p-6')}
          onInteractOutside={(event) => {
            if (disableOutsideDialog) {
              event.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}
