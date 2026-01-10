import { type ReactNode } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Props {
  children: ReactNode
  name: string
  title: string | ReactNode
  headertClassName?: string
  contentClassName?: string
  disabled?: boolean
}

export const AccordionCustom = ({
  headertClassName,
  children,
  name,
  title,
  contentClassName,
  disabled,
}: Props) => {
  return (
    <>
      <AccordionItem disabled={disabled} value={name} className={'border'}>
        <AccordionTrigger
          className={`bg-primary-foreground ${headertClassName} text-primary p-3 rounded-none hover:no-underline flex items-center`}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent className={`p-5 ${contentClassName} border-b`}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
