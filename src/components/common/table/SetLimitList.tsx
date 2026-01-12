import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Props {
  text?: string
  className?: string
  setLimit?: any
}

const SetLimitList = ({ text, className, setLimit }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // ambil limit dari URL jika tidak pakai state
  const currentValue = searchParams.get('limit') ?? '10'

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value)

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('limit', String(value))
    newParams.set('page', '1') // reset page
    setSearchParams(newParams)
  }

  return (
    <div className="flex items-center gap-2">
      {text ?? 'Tampilkan'}
      <select
        value={currentValue}
        onChange={setLimit ?? handleChange}
        className={`bg-gray-100 p-1.5 rounded border ${className ?? ''}`}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      data
    </div>
  )
}

export default SetLimitList
