import { cn } from '@/lib/utils'


import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useEffect, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialogCommon'
import { DialogTitle } from '@/components/ui/dialog'

interface DialogCustomProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  disableOutsideDialog?: boolean
  isAuto?: boolean
  width?: string
  isMobile?: boolean
  backgroundColor?: string
  height?: string
  position?: 'middle' | 'top' | 'bottom' | 'left' | 'right'
}

export function DialogCustom({
  open,
  setOpen,
  title,
  description,
  children,
  className,
  disableOutsideDialog = false,
  backgroundColor,
  height,
  isAuto,
  isMobile,
  width,
  position,
}: DialogCustomProps) {
  // Fix untuk bug pointer-events di Radix UI
  useEffect(() => {
    if (!open) {
      // Cleanup pointer-events setelah dialog ditutup
      const cleanup = () => {
        document.body.style.pointerEvents = ''
        // Hapus juga dari semua elemen yang mungkin terpengaruh
        const elementsWithPointerNone = document.querySelectorAll('[style*="pointer-events: none"]')
        elementsWithPointerNone.forEach((el) => {
          if (el !== document.body) {
            ;(el as HTMLElement).style.pointerEvents = ''
          }
        })
      }

      // Delay sedikit untuk memastikan Radix selesai melakukan cleanup
      const timeoutId = setTimeout(cleanup, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [open])

  // Alternative: Gunakan observer untuk memantau perubahan style
  useEffect(() => {
    if (!open) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const target = mutation.target as HTMLElement
            if (target === document.body && target.style.pointerEvents === 'none') {
              // Delay sedikit sebelum cleanup
              setTimeout(() => {
                if (!open) {
                  target.style.pointerEvents = ''
                }
              }, 50)
            }
          }
        })
      })

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
      })

      return () => observer.disconnect()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn('bg-white p-6 flex flex-col gap-4', className, backgroundColor)}
        position={position}
        style={{
          width: isAuto ? 'auto' : isMobile ? '90%' : width ? width : '30%',
          height: height || 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onInteractOutside={(event) => {
          if (disableOutsideDialog) {
            event.preventDefault()
          }
        }}
        onCloseAutoFocus={(event) => {
          // Prevent auto focus dan pastikan pointer events dibersihkan
          event.preventDefault()
          setTimeout(() => {
            document.body.style.pointerEvents = ''
          }, 0)
        }}
      >
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
            asChild
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => {
                setOpen(false)
                // Force cleanup pointer events
                setTimeout(() => {
                  document.body.style.pointerEvents = ''
                }, 0)
              }}
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </button>
          </DialogPrimitive.Close>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
