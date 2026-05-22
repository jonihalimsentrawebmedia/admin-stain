import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ILetterClassification } from '../data/types'
import ButtonAddLetterClassification from '../component/buttonAdd.tsx'
import ButtonDeleteLetterClassification from '../component/buttonDelete.tsx'
import ButtonEditLetterClassification from '../component/buttonEdit.tsx'

const INDENT = 15

export const ColumnsLetterClassification = () => {
  const [searchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  return useMemo<ColumnDef<ILetterClassification>[]>(
    () => [
      {
        id: 'no',
        header: '#',
        cell: ({ row }) => {
          return (
            <div className="flex items-center h-full min-h-[44px]">
              {!row?.original?.id_parent_klasifikasi_surat && (
                <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
              )}
            </div>
          )
        },
      },

      {
        accessorKey: 'kode_klasifikasi',
        header: 'Kode Klasifikasi',
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

              {/* Expand button */}
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

                <span className="font-medium">{String(getValue())}</span>
              </div>
            </div>
          )
        },
      },

      {
        accessorKey: 'nama',
        header: 'Keterangan',
      },

      {
        id: 'tambah_children',
        header: 'Tambah Children',
        cell: ({ row }) => {
          return <ButtonAddLetterClassification data={row.original} />
        },
      },

      {
        id: 'action',
        header: '',
        cell: ({ row }) => {
          const data = row.original
          const parentRow = row.getParentRow()
          const editData = {
            ...data,
            depth: row.depth,
            rowId: row.id,
            parentId: parentRow?.original?.id_parent_klasifikasi_surat ?? null,
            parentData: parentRow?.original ?? null,
            children: row.subRows?.map((item) => item.original) ?? [],
            isParent: row.subRows.length > 0,
            isChild: row.depth > 0,
            hasChildren: row.subRows.length > 0,
          }

          return (
            <div className="flex justify-end w-full gap-2">
              <ButtonEditLetterClassification
                parentData={parentRow?.original ?? undefined}
                data={editData}
              />
              <ButtonDeleteLetterClassification
                data={data}
                parentData={parentRow?.original ?? undefined}
              />
            </div>
          )
        },
      },
    ],
    [page, limit]
  )
}
