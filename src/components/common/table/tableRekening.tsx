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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  className?: string
  thClassName?: string
  tdClassName?: string
  rowIdKey?: keyof TData
  rowSelection?: Record<string, boolean>
  onRowSelectionChange?: (selection: Record<string, boolean>) => void
  onSelectedRowsChange?: (selectedIds: TData[]) => void
}

export function TableBasicBank<TData, TValue>({
  columns,
  data,
  rowIdKey,
  loading,
  className,
  thClassName,
  tdClassName,
  rowSelection = {}, // default empty object
  onRowSelectionChange,
  onSelectedRowsChange,
}: DataTableProps<TData, TValue>) {
  // Gunakan rowSelection dari prop langsung, tanpa useState
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: (updaterOrValue) => {
      // TanStack Table bisa mengirim updater function atau value langsung
      let newSelection: Record<string, boolean>
      if (typeof updaterOrValue === 'function') {
        newSelection = updaterOrValue(rowSelection)
      } else {
        newSelection = updaterOrValue
      }
      // Kirim ke parent (jika ada callback)
      onRowSelectionChange?.(newSelection)
      // Opsional: konversi ke array ID untuk kemudahan parent
      if (onSelectedRowsChange) {
        const selectedIds = Object.keys(newSelection).filter((key) => newSelection[key])
        onSelectedRowsChange(selectedIds as any)
      }
    },
    getRowId: (row, index) => {
      if (rowIdKey) {
        const id = row[rowIdKey as keyof TData]
        return id ? String(id) : `row-${index}`
      }
      return `row-${index}`
    },
    getCoreRowModel: getCoreRowModel(),
  })

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
