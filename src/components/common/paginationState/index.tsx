import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'

export interface Meta {
  last_page: number
  total: number
}

interface Props {
  meta?: Meta
  length: number
  page: number
  onPageChange: (page: number) => void
}

const PaginationState = ({ meta, page, onPageChange }: Props) => {
  const lastPage = meta?.last_page === 0 ? 1 : (meta?.last_page ?? 1)

  const updatePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > lastPage) return

    onPageChange(pageNumber)
  }

  const handleNextPrev = (direction: 'next' | 'prev') => {
    updatePage(direction === 'next' ? page + 1 : page - 1)
  }

  const generatePageNumbers = (): (number | string)[] => {
    if (lastPage <= 7) return Array.from({ length: lastPage }, (_, i) => i + 1)

    if (page <= 4) return [1, 2, 3, 4, 5, '...', lastPage]

    if (page >= lastPage - 3)
      return [1, '...', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]

    return [1, '...', page - 1, page, page + 1, '...', lastPage]
  }

  const pages = generatePageNumbers()

  return (
    <div className="mt-5 flex flex-col gap-2 items-start lg:flex-row lg:items-center justify-between">
      <div className="flex items-center gap-2">
        <NavButton
          icon={<IoChevronBack />}
          disabled={page <= 1}
          onClick={(e) => {
            e.preventDefault()
            handleNextPrev('prev')
          }}
        />

        {pages.map((item, index) =>
          item === '...' ? (
            <Ellipsis key={index} />
          ) : (
            <PageButton
              key={index}
              page={item}
              active={item === page}
              onClick={(e) => {
                e.preventDefault()
                updatePage(Number(item))
              }}
            />
          )
        )}

        <NavButton
          icon={<IoChevronForwardOutline />}
          disabled={page >= lastPage}
          onClick={(e) => {
            e.preventDefault()
            handleNextPrev('next')
          }}
        />
      </div>
    </div>
  )
}

export default PaginationState

// --- Sub-components ---

const NavButton = ({
  icon,
  disabled,
  onClick,
}: {
  icon: React.ReactNode
  disabled: boolean
  onClick: (e: any) => void
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
  onClick: (e: any) => void
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
