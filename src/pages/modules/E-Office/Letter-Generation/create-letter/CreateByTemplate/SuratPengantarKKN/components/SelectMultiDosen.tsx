import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { useCallback, useState } from 'react'
import {
  type IHumanResource,
  UseGetHumanResource,
} from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { MdDelete, MdSearch } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import PaginationState from '@/components/common/paginationState'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ColumnDef } from '@tanstack/react-table'

interface Props {
  form: UseFormReturn<any>
}

const SelectMultiDosen = (props: Props) => {
  const { form } = props
  const [open, setOpen] = useState(false)
  const [selectedDosen, setSelectedDosen] = useState<IHumanResource[]>([])
  const dpl = useFieldArray({
    control: form.control,
    name: 'id_dpl',
  }) as any

  const handleSelect = useCallback(
    (dosen: IHumanResource) => {
      const alreadySelected = selectedDosen.some((d) => d.id_sdm === dosen.id_sdm)
      if (alreadySelected) return
      dpl.append(dosen.id_sdm)
      setSelectedDosen((prev) => [...prev, dosen])
    },
    [dpl, selectedDosen]
  )

  const handleDelete = useCallback(
    (index: number) => {
      dpl.remove(index)
      setSelectedDosen((prev) => prev.filter((_, i) => i !== index))
    },
    [dpl]
  )

  const selectedIds = selectedDosen.map((d) => d.id_sdm)

  const dialogColumns = ReturnDialogColumns({
    onSelect: handleSelect,
    selectedIds,
  })

  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
  })
  const { humanResource, meta } = UseGetHumanResource({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
  })

  return (
    <>
      <Button
        type={'button'}
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
        }}
        variant={'outline'}
        className={'border-primary rounded-full text-primary hover:bg-primary hover:text-white'}
      >
        <MdSearch />
        Pilih DPL
      </Button>

      {selectedDosen.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedDosen.map((dosen, index) => (
            <div
              key={dosen.id_sdm}
              className="flex items-center justify-between rounded border bg-gray-50 px-3 py-2"
            >
              <p className="text-sm text-gray-800">
                {dosen.nama} - NIP. {dosen.nip} - {dosen.nama_unit_kerja}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="ml-2 rounded bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <MdDelete className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <DialogBasic title={'Pilih DPL'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <div>
          <TableCustom
            columns={dialogColumns}
            meta={meta}
            columnsName={['']}
            thClassName={'bg-primary text-white'}
            data={humanResource}
            isShowPagination={false}
            isShowFilter={false}
          />
          <div className="flex justify-end">
            {meta && (
              <PaginationState
                meta={meta}
                length={meta?.total ?? 0}
                page={Number(filter.page)}
                onPageChange={(page) =>
                  setFilter((prev) => ({
                    ...prev,
                    page: page.toString(),
                  }))
                }
              />
            )}
          </div>
        </div>
      </DialogBasic>
    </>
  )
}

export default SelectMultiDosen

const ReturnDialogColumns = ({
  onSelect,
  selectedIds,
}: {
  onSelect: (dosen: IHumanResource) => void
  selectedIds: string[]
}) => {
  const Columns: ColumnDef<IHumanResource>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1}</p>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
      cell: ({ row }) => {
        const data = row.original
        return <>{data.jabatan?.join(', ')}</>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        const isSelected = selectedIds.includes(data.id_sdm)
        return (
          <>
            <Button onClick={() => onSelect(data)} disabled={isSelected} className={'text-white'}>
              {isSelected ? 'Dipilih' : 'Pilih'}
            </Button>
          </>
        )
      },
    },
  ]
  return Columns
}
