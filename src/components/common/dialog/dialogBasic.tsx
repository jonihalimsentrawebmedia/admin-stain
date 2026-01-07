import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode
  title: string | ReactNode
  description?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
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
          className={className}
          onInteractOutside={(event) => {
            if (disableOutsideDialog) {
              event.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}
