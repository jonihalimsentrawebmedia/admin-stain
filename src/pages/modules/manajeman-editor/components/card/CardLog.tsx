import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  children2: ReactNode
}
const CardLog = ({ children, children2 }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 ">
        <p className="text-2xl text-[#0E874A] space-y-2">DATA SAAT INI</p>
        {children}
      </div>
      <div className="bg-[#F5F9FF] space-y-2 p-4 border-l-2 border-l-[#70A4F2]">
        <p className="text-2xl text-[#2769CD]">DATA PENGAJUAN</p>
        {children2}
      </div>
    </div>
  )
}

export default CardLog
