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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Controlled expanded state (optional — uses internal state if omitted) */
  expanded?: ExpandedState
  /** Controlled expanded state setter (required when expanded is provided) */
  setExpanded?: React.Dispatch<React.SetStateAction<ExpandedState>>
  /** Optional custom row ID accessor. Defaults to row index (position based). */
  getRowId?: (row: TData) => string
}

export function DataTableRecursive<
  TData extends {
    children?: TData[]
    id_klasifikasi_surat?: string
  },
  TValue,
>({
  columns,
  data,
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
    getRowId: customGetRowId ?? ((row, index) => row.id_klasifikasi_surat ?? String(index)),

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
        <TableHeader className={'bg-primary text-white'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={'hover:bg-primary'}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={'text-white'}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="align-top relative">
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
