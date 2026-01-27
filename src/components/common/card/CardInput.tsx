import { type ReactNode } from 'react'
interface Props {
  title: string
  children: ReactNode
  classNameChildren?: string
}
const CardInput = ({ children, title, classNameChildren = 'p-4' }: Props) => {
  return (
    <div className="w-full border">
      <div className="p-4 border-b bg-[#F5FFFA] text-primary justify-between font-medium">
        {title}
      </div>
      <div className={` flex flex-col gap-4 ${classNameChildren}`}>{children}</div>
    </div>
  )
}

export default CardInput
