'use client'

import {
  type ColumnDef,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  /** Controlled expanded state (optional — uses internal state if omitted) */
  expanded?: ExpandedState
  /** Controlled expanded state setter (required when expanded is provided) */
  setExpanded?: React.Dispatch<React.SetStateAction<ExpandedState>>
  /** Optional custom row ID accessor. Defaults to row index (position based). */
  getRowId?: (row: TData) => string
}

export function DataTableRecursive<TData extends { children?: TData[] }, TValue>({
  columns,
  data,
  loading = false,
  expanded: controlledExpanded,
  setExpanded: controlledSetExpanded,
  getRowId: customGetRowId,
}: DataTableProps<TData, TValue>) {
  const isControlled = controlledExpanded !== undefined && controlledSetExpanded !== undefined
  const [internalExpanded, internalSetExpanded] = useState<ExpandedState>({})
  const expanded = isControlled ? controlledExpanded : internalExpanded
  const setExpanded = isControlled ? controlledSetExpanded : internalSetExpanded

  const table = useReactTable({
    data,
    columns,
    getRowId: customGetRowId ?? ((_row, index) => String(index)),

    state: {
      expanded,
    },

    onExpandedChange: setExpanded,

    getCoreRowModel: getCoreRowModel(),

    // IMPORTANT
    getExpandedRowModel: getExpandedRowModel(),

    // recursive children
    getSubRows: (row) => row.children,

    // optional — prevents losing expanded state on data changes
    autoResetExpanded: false,
  })

  return (
    <div className="overflow-hidden rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-[#F5FFFA]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-primary font-semibold">
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
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex} className="border">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="align-top relative border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center border">
                Data Tidak Ada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
