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

import { useEffect, useState, type ReactNode } from 'react'
import SetLimitList from './SetLimitList'
import Search from './Search'
import TablePaginate, { type Meta } from './TablePagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IconListTable } from './icon'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
  isShowChoiceColumn?: boolean
  setPage?: (value: any) => void
  setLimit?: (value: any) => void
  setSearch?: (value: any) => void
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
    isShowChoiceColumn,
    setLimit,
    setPage,
    setSearch,
  } = props
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const [searchparams, setSearchParams] = useSearchParams()
  const [columnChecked, setColumnChecked] = useState<any>([])
  const handleSearch = (query: string) => {
    if (setSearch) {
      setSearch(query)
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.set('search', query)
        newParams.set('page', '1') // Reset ke halaman 1 saat search
        if (query === '') newParams.delete('search')
        return newParams
      })
    }
  }
  const columnCount = columns?.length || 5
  const totalData = meta?.total ?? 0
  const limitData = searchparams.get('limit') ? Number(searchparams.get('limit')) : 10
  useEffect(() => {
    const temp = columns
      .map((item: any) => item.accessorKey)
      .filter(
        (item: any) =>
          item !== 'id_satuan_organisasi' &&
          item != 'parent_id' &&
          item != 'ip' &&
          item !== 'endpoint_be'
      )
    setColumnChecked(temp)
  }, [])
  return (
    <div className="flex flex-col w-full gap-4 ">
      {isShowFilter && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center  justify-between">
          <div className={`flex w-full items-end gap-4 ${addFilter ? '' : 'justify-between'}`}>
            {addFilter}
            <Search
              onSearch={handleSearch}
              innerClassName={classNameSearch}
              className="rounded-lg w-full"
              position="start"
              placeholder={placeHolderSearch}
            />
          </div>
          {isShowChoiceColumn && (
            <Popover>
              <PopoverTrigger>
                <IconListTable />
              </PopoverTrigger>
              <PopoverContent className="w-fit flex flex-col gap-2">
                {columns.map((item: any) => (
                  <div
                    className={`flex gap-2 items-center ${item.header == '' || item.header == '#' || item.accessorKey == 'aksi' || item.accessorKey == 'action' || item.accessorKey == 'no' ? 'hidden' : ''}`}
                  >
                    <Checkbox
                      onCheckedChange={() => {
                        const temp = [...columnChecked]

                        if (!columnChecked.includes(item.accessorKey)) {
                          temp.push(item.accessorKey)
                          setColumnChecked(temp)
                        } else {
                          const temp2 = temp.filter((sub) => {
                            return sub != item.accessorKey
                          })
                          setColumnChecked(temp2)
                        }
                      }}
                      checked={columnChecked.includes(item.accessorKey)}
                      id={item.accessorKey}
                    />
                    <Label htmlFor={item.accessorKey}>{item.header}</Label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}

      <Table className={`${className}`}>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, l) => (
                <TableHead
                  colSpan={header.colSpan}
                  key={l}
                  className={` border bg-[#F5FFFA] text-primary ${thClassName} ${columnChecked.includes(header.id) ? '' : 'hidden'}`}
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
                  {row.getVisibleCells().map((cell: any, k) => (
                    <TableCell
                      className={`whitespace-pre-wrap border ${tdClassName + ' text-[#3E3E3E]'} ${columnChecked.includes(cell.column.columnDef.accessorKey) ? '' : 'hidden'}`}
                      key={k}
                    >
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
              <SetLimitList
                setLimit={setLimit}
                text={`${limitData > totalData ? totalData : limitData} Data dari
                ${meta?.total} `}
              />
            ) : (
              <div>
                Menampilkan 1 - {limitData > totalData ? totalData : limitData} Data dari{' '}
                {meta?.total} Data
              </div>
            )}
          </div>
          <TablePaginate length={10} meta={meta} setPage={setPage} />
        </div>
      )}
    </div>
  )
}

export default TableCustom
