import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface Props {
  text?: string
  className?: string
  value?: number
  setLimit?: Dispatch<SetStateAction<number>>
}

const LimitState = ({ text, className, value = 10, setLimit }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit?.(Number(e.target.value))
  }

  return (
    <div className="flex items-center gap-2">
      Tampilkan
      <select
        value={value}
        onChange={handleChange}
        className={`rounded border bg-gray-100 p-1.5 ${className ?? ''}`}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      {text}
    </div>
  )
}

export default LimitState
