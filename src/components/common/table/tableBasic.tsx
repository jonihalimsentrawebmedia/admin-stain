'use client'

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  className?: string
  thClassName?: string
  tdClassName?: string
  rowIdKey?: string
  // eslint-disable-next-line no-unused-vars
  onSelectedRowsChange?: (rows: TData[]) => void
}

export function TableBasic<TData, TValue>({
  columns,
  data,
  rowIdKey,
  loading,
  className,
  thClassName,
  tdClassName,
  onSelectedRowsChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: (row, index) => {
      const id = row[rowIdKey as keyof TData] as TData[keyof TData]
      return id ? String(id) : `row-${index}`
    },
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    const selectedIds = Object.keys(rowSelection)

    onSelectedRowsChange?.(selectedIds as TData[])
    //eslint-disable-next-line
  }, [rowSelection])

  return (
    <div className={clsx('overflow-hidden rounded-md border', className)}>
      <Table>
        <TableHeader className={clsx('bg-primary')}>
          {table.getHeaderGroups().map((headerGroup, k) => (
            <TableRow key={k} className={'hover:bg-primary'}>
              {headerGroup.headers.map((header, l) => (
                <TableHead key={l} className={clsx('text-white last:text-center', thClassName)}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            // ✅ Skeleton Rows
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, k) => (
              <TableRow key={k} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell, l) => (
                  <TableCell key={l} className={clsx('last:text-center', tdClassName)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
