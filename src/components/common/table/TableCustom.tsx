import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useSearchParams } from 'react-router-dom'

import type { ReactNode } from 'react'
import SetLimitList from './SetLimitList'
import Search from './Search'
import TablePaginate, { type Meta } from './TablePagination'
import { Skeleton } from '@/components/ui/skeleton'
interface Props {
  data: any
  columns: any
  className?: string
  thClassName?: string
  tdClassName?: string
  isShowFilter?: boolean
  isShowPagination?: boolean
  tdFooterClassName?: string
  isShowFooterTable?: boolean
  addFilter?: ReactNode
  addRowColumn?: ReactNode
  classNameSearch?: string
  placeHolderSearch?: string
  loading?: boolean
  meta?: Meta
  isShowLimit?: boolean
}
const TableCustom = (props: Props) => {
  const {
    className,
    columns,
    data,
    tdClassName = 'border',
    thClassName = '',
    isShowFilter = true,
    isShowPagination = true,
    tdFooterClassName,
    isShowFooterTable,
    addFilter,
    addRowColumn,
    loading,
    classNameSearch = 'rounded-lg',
    placeHolderSearch = 'Cari...',
    meta,
    isShowLimit = true,
  } = props
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const [searchparams, setSearchParams] = useSearchParams()
  const handleSearch = (query: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('search', query)
      newParams.set('page', '1') // Reset ke halaman 1 saat search
      if (query === '') newParams.delete('search')
      return newParams
    })
  }
  const columnCount = columns?.length || 5
  const totalData = meta?.total ?? 0
  const limitData = searchparams.get('limit') ? Number(searchparams.get('limit')) : 10
  return (
    <div className="flex flex-col w-full gap-4 ">
      {isShowFilter && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center  justify-between">
          <div className={`flex w-full items-center gap-4 ${addFilter ? '' : 'justify-between'}`}>
            {addFilter}
            <Search
              onSearch={handleSearch}
              innerClassName={classNameSearch}
              className="rounded-lg w-full"
              position="start"
              placeholder={placeHolderSearch}
            />
          </div>
        </div>
      )}

      <Table className={`${className}  `}>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, l) => (
                <TableHead
                  colSpan={header.colSpan}
                  key={l}
                  className={` border bg-[#F5FFFA] text-primary ${thClassName}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data?.length == 0 && loading == false && (
            <TableRow>
              <TableCell colSpan={columnCount} className="text-center border">
                Data Tidak Ada
              </TableCell>
            </TableRow>
          )}
          {loading
            ? Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <TableCell key={colIndex} className={`${tdClassName}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, k) => (
                    <TableCell className={tdClassName + ' text-[#3E3E3E]'} key={k}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

          {addRowColumn && addRowColumn}
        </TableBody>
        {isShowFooterTable && (
          <TableFooter>
            {table?.getFooterGroups()?.map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border font-semibold ${tdFooterClassName}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
      {isShowPagination && (
        <div className="flex gap-4 items-center justify-between">
          <div>
            {isShowLimit ? (
              <SetLimitList />
            ) : (
              <div>
                Menampilkan 1 - {limitData > totalData ? totalData : limitData} Data dari{' '}
                {meta?.total} Data
              </div>
            )}
          </div>
          <TablePaginate length={10} meta={meta} />
        </div>
      )}
    </div>
  )
}

export default TableCustom
