import { cn } from '@/lib/utils'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface SearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
  position?: 'start' | 'end'
  className?: string
  innerClassName?: string
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Cari...',
  position = 'start',
  className,
  innerClassName,
}) => {
  const [searchParam] = useSearchParams()
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 1000) // 1 detik

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  useEffect(() => {
    if (hasSearched && onSearch) {
      onSearch(debouncedQuery)
    } else {
      setHasSearched(true)
    }
  }, [debouncedQuery])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const clearSearch = () => {
    setQuery('')
    if (onSearch) onSearch('')
  }

  useEffect(() => {
    if (searchParam.get('search')) {
      setQuery(searchParam.get('search') ?? '')
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      {/* Suffix <search */}
      {position === 'start' && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm select-none">
          <SearchIcon size={16} />
        </span>
      )}

      <input
        type="text"
        className={cn(
          `w-full border bg-white border-[#CDCDCD] rounded py-3 focus:outline-none focus:ring-2 focus:ring-primary`,
          position === 'end' ? 'pr-[60px] pl-4' : 'pr-10 pl-10',
          innerClassName
        )}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />

      {/* Suffix <search di kanan jika posisi end */}
      {position === 'end' && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#295AA3] text-sm select-none">
          <SearchIcon size={16} />
        </span>
      )}

      {/* Clear button (X) */}
      {query && (
        <button
          onClick={clearSearch}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700',
            position === 'end' ? 'right-10 ' : 'right-4'
          )}
          aria-label="Clear search"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  )
}

export default Search
