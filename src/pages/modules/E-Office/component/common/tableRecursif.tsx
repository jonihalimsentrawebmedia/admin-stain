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
}

export function DataTableRecursive<
  TData extends {
    children?: TData[]
  },
  TValue,
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,

    state: {
      expanded,
    },

    onExpandedChange: setExpanded,

    getCoreRowModel: getCoreRowModel(),

    // IMPORTANT
    getExpandedRowModel: getExpandedRowModel(),

    // recursive children
    getSubRows: (row) => row.children,

    // optional
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
