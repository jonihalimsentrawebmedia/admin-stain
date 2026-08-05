import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { IMenu } from './types'
import { ICON_MAP } from './icons'
import ButtonEditSideMenu from '../components/buttonEdit'
import ButtonDeleteSideMenu from '../components/buttonDelete'

const INDENT = 18

export const ColumnsSideMenu = ({ menu }: { menu: IMenu[] }) =>
  useMemo<ColumnDef<IMenu>[]>(
    () => [
      {
        id: 'no',
        header: '#',
        cell: ({ row }) => {
          return (
            <div className="flex items-center h-full min-h-[44px]">
              {!row?.original?.parent_id && (
                <span className="text-sm font-medium">{row.index + 1}</span>
              )}
            </div>
          )
        },
      },

      {
        accessorKey: 'label',
        header: 'Label',
        cell: ({ row, getValue }) => {
          const depth = row.depth
          const canExpand = row.getCanExpand()
          return (
            <div
              className="relative flex items-center min-h-[44px]"
              style={{
                paddingLeft: `${depth * INDENT}px`,
              }}
            >
              {/* Vertical hierarchy lines */}
              {Array.from({ length: depth }).map((_, index) => (
                <div
                  key={index}
                  className="absolute top-0 bottom-0 border-l border-gray-300"
                  style={{
                    left: `${index * INDENT + INDENT / 2}px`,
                  }}
                />
              ))}
              {depth > 0 && (
                <div
                  className="absolute border-t border-gray-300 w-4"
                  style={{
                    left: `${depth * INDENT - INDENT / 2}px`,
                  }}
                />
              )}

              {/* Expand button + icon + label */}
              <div className="relative z-10 flex items-center gap-2 bg-background pr-2">
                {canExpand ? (
                  <button
                    type="button"
                    onClick={row.getToggleExpandedHandler()}
                    className="flex items-center justify-center rounded hover:bg-muted size-6"
                  >
                    {row.getIsExpanded() ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronRight className="size-4" />
                    )}
                  </button>
                ) : (
                  <div className="size-6" />
                )}

                {row.original.icon && ICON_MAP[row.original.icon] && (
                  <span className="text-primary shrink-0">{ICON_MAP[row.original.icon]}</span>
                )}

                <span className="font-medium">{String(getValue())}</span>
              </div>
            </div>
          )
        },
      },

      {
        accessorKey: 'link',
        header: 'Link',
        cell: ({ getValue }) => {
          const value = String(getValue() ?? '')
          return <span className="whitespace-pre-line">{value || '-'}</span>
        },
      },

      { accessorKey: 'urutan', header: 'Urutan' },

      {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }) => {
          const active = row.original.is_active
          return (
            <span
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              )}
            >
              {active ? 'Aktif' : 'Non Aktif'}
            </span>
          )
        },
      },

      {
        id: 'action',
        header: 'Aksi',
        cell: ({ row }) => {
          const data = row.original
          const parentRow = row.getParentRow()
          return (
            <div className="flex justify-end w-full gap-2">
              <ButtonEditSideMenu data={data} menu={menu} />
              <ButtonDeleteSideMenu data={data} parentData={parentRow?.original} />
            </div>
          )
        },
      },
    ],
    [menu]
  )
