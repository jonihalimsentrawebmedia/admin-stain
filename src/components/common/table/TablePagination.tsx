import { useSearchParams } from 'react-router-dom'
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'
import { useState } from 'react'

export interface Meta {
  last_page: number
  total: number
}

interface Props {
  meta?: Meta
  length: number
  setPage?: (value: string) => void
}

const TablePaginate = ({ meta, setPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') ?? '1'))

  // const limit = Number(searchParams.get("limit") ?? "10");

  // const total = meta?.total ?? 0;
  const lastPage = meta?.last_page == 0 ? 1 : (meta?.last_page ?? 1)

  // const start = limit * (currentPage - 1) + 1;
  // const end = Math.min(currentPage * limit, total);

  const updatePage = (page: number) => {
    if (setPage) {
      setPage(page.toString())
      setCurrentPage(page)
    } else {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', page.toString())
      setSearchParams(newParams)
      setCurrentPage(page)
    }
  }

  const handleNextPrev = (direction: 'next' | 'prev') => {
    const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1
    if (nextPage < 1 || nextPage > lastPage) return
    updatePage(nextPage)
  }

  const generatePageNumbers = (): (number | string)[] => {
    if (lastPage <= 7) return Array.from({ length: lastPage }, (_, i) => i + 1)

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', lastPage]
    }

    if (currentPage >= lastPage - 3) {
      return [1, '...', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage]
  }

  const pages = generatePageNumbers()

  return (
    <div className="mt-5 flex flex-col gap-2 items-start lg:flex-row lg:items-center justify-between">
      <div className="flex items-center text-xs lg:text-base gap-2">
        <NavButton
          icon={<IoChevronBack />}
          disabled={currentPage <= 1}
          onClick={() => handleNextPrev('prev')}
        />

        {pages.map((page, index) =>
          page === '...' ? (
            <Ellipsis key={index} />
          ) : (
            <PageButton
              key={index}
              page={page}
              active={page === currentPage}
              onClick={() => updatePage(Number(page))}
            />
          )
        )}

        <NavButton
          icon={<IoChevronForwardOutline />}
          disabled={currentPage >= lastPage}
          onClick={() => handleNextPrev('next')}
        />
      </div>
    </div>
  )
}

export default TablePaginate

// --- Sub-components ---

const NavButton = ({
  icon,
  disabled,
  onClick,
}: {
  icon: React.ReactNode
  disabled: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className="bg-gray-200 p-2.5 rounded-full disabled:opacity-50 hover:disabled:bg-gray-200 hover:disabled:text-gray-500 hover:bg-primary hover:text-white"
    disabled={disabled}
  >
    {icon}
  </button>
)

const PageButton = ({
  page,
  active,
  onClick,
}: {
  page: number | any
  active: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2   border-b ${
      active
        ? 'border-b-primary  text-primary'
        : 'bg-white hover:border-b-primary border-b-transparent hover:text-primary text-gray-300'
    }`}
  >
    {page}
  </button>
)

const Ellipsis = () => (
  <span className="px-3 py-2 text-gray-500 border rounded-lg bg-white cursor-default">...</span>
)
