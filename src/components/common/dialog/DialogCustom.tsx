'use client'

import { type Dispatch, type ReactNode, type SetStateAction, useEffect } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialogCommon'

interface DialogCustomProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  disableOutsideDialog?: boolean
  width?: string
  height?: string
  position?: 'middle' | 'top' | 'bottom' | 'left' | 'right'
  isAuto?: boolean
}

export function DialogCustom({
  open,
  setOpen,
  title,
  description,
  children,
  className,
  disableOutsideDialog = false,
  width,
  height,
  isAuto = false,
}: DialogCustomProps) {
  // Cleanup pointer-events bug Radix UI
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = ''
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn('bg-white p-6 pointer-events-auto', className)}
        style={{
          width: isAuto ? 'auto' : width || '70%',
          maxWidth: 'calc(100vw - 2rem)',
          height: height || 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onInteractOutside={(e) => {
          if (disableOutsideDialog) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Close Button */}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
          asChild
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </DialogPrimitive.Close>

        <div className="mt-2">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
