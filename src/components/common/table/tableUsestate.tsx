'use client'

import { useEffect, useState } from 'react'
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  className?: string
  thClassName?: string
  tdClassName?: string
  rowIdKey?: keyof TData
  selected?: string[]
  onSelectedRowsChange?: (selectedIds: string[]) => void
}

export function TableBasicState<TData, TValue>({
  columns,
  data,
  loading = false,
  className,
  thClassName,
  tdClassName,
  rowIdKey = 'id' as keyof TData,
  selected = [],
  onSelectedRowsChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  // Sync selected dari parent ke table (dengan guard)
  useEffect(() => {
    const newSelection: Record<string, boolean> = {}
    selected.forEach((id) => {
      if (id) newSelection[id] = true
    })

    // Hanya update jika benar-benar berbeda
    if (JSON.stringify(newSelection) !== JSON.stringify(rowSelection)) {
      setRowSelection(newSelection)
    }
  }, [selected])

  const table = useReactTable({
    data: data || [],
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newRowSelection = typeof updater === 'function' ? updater(rowSelection) : updater

      setRowSelection(newRowSelection)

      // Kirim ke parent
      const selectedIds = Object.keys(newRowSelection).filter((key) => newRowSelection[key])
      onSelectedRowsChange?.(selectedIds)
    },
    getRowId: (row) => {
      const id = row[rowIdKey] as string | number | undefined
      return id ? String(id) : ''
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={clsx('overflow-hidden rounded-md border', className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup,k) => (
            <TableRow key={k}>
              {headerGroup.headers.map((header,l) => (
                <TableHead key={l} className={thClassName}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row,m) => (
              <TableRow key={m} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell,n) => (
                  <TableCell key={n} className={tdClassName}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
