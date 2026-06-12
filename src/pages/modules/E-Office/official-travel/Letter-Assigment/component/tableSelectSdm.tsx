import { TableBasicState } from '@/components/common/table/tableUsestate.tsx'
import type { IHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { BasicProps } from '@/utils/globalType.ts'
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import Search from '@/components/common/table/Search.tsx'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import TablePaginate, { type Meta } from '@/components/common/table/TablePagination.tsx'
import { Label } from '@/components/ui/label.tsx'
import type { TEmployeeSchema } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/resolver.tsx'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { FaSave } from 'react-icons/fa'

interface props {
  data: IHumanResource[]
  filter: BasicProps
  setFilter: Dispatch<SetStateAction<BasicProps>>
  meta?: Meta
  listUser: TEmployeeSchema[]
  setListUser: Dispatch<SetStateAction<TEmployeeSchema[]>>
  form: UseFormReturn<any>
  name: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const columns: ColumnDef<IHumanResource>[] = [
  {
    id: 'selected',
    header: ({ table }) => {
      return (
        <Label className={'flex items-center gap-1.5'}>
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </Label>
      )
    },
    cell: ({ row }) => {
      const { id_sdm } = row.original
      return (
        <div className={'flex items-center gap-1.5'}>
          <input
            key={row.index}
            disabled={!id_sdm}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'jabatan',
    header: 'Jabatan',
  },
  {
    accessorKey: 'nama_unit_kerja',
    header: 'Unit Kerja',
  },
  {
    accessorKey: 'nip',
    header: 'NIP/NIK',
    cell: ({ row }) => {
      const data = row.original
      return <>{data?.nip ?? data?.nik}</>
    },
  },
]

const TableSelectSdm = (props: props) => {
  const { data, setFilter, filter, meta, setListUser, form, name, listUser, open, setOpen } = props
  const [selected, setSelected] = useState<string[]>([])
  const initialized = useRef(false)

  // ── 1. Inisialisasi: sync selected dari form (hanya sekali / saat form data berubah) ──
  useEffect(() => {
    const dataInput = form.getValues(name)
    if (dataInput?.length) {
      const ids = dataInput.map((item: any) => item.id_sdm)
      setSelected(ids)
    }
    initialized.current = true
  }, [])

  // ── 2. Saat selected berubah (dari checkbox), update listUser ──
  useEffect(() => {
    // skip render pertama agar tidak timpa inisialisasi
    if (!initialized.current) return

    const temp: IHumanResource[] = data.filter((item) => selected.includes(item.id_sdm))
    const TempForm: any[] = temp.map((row: IHumanResource) => ({
      id_sdm: row?.id_sdm,
      metode_tambah: 'DOSEN_STAFF',
      nama_lengkap: row?.nama ?? '',
      satuan_kerja: row?.nama_unit_kerja ?? '',
      nip: row?.nip ?? '',
      nik: row?.nik ?? '',
      jabatan_pegawai: row?.jabatan?.[0] ?? '',
      alamat: row?.alamat ?? '',
    }))
    setListUser(TempForm)
  }, [selected, data])

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-end justify-between w-full gap-1.5">
          <SelectBasic
            className={'w-fit'}
            onChange={(e) => {
              setFilter({
                ...filter,
                limit: e,
              })
            }}
            innerClassName={'lg:min-w-20!'}
            value={filter.limit}
            data={[
              { label: '10', value: '10' },
              { label: '25', value: '25' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
          />
          <Search
            className={'w-fit'}
            innerClassName={'p-1.5'}
            position={'end'}
            onSearch={(e) => {
              setFilter({
                ...filter,
                search: e,
              })
            }}
          />
        </div>

        <div className="max-h-[450px] overflow-y-scroll">
          <TableBasicState
            tdClassName={'whitespace-pre-wrap'}
            columns={columns as any}
            thClassName={'bg-primary text-white'}
            data={data}
            rowIdKey={'id_sdm'}
            selected={selected}
            onSelectedRowsChange={(e) => {
              setSelected(e)
            }}
          />
        </div>
        <div className="flex items-center justify-end -mt-6">
          {meta && (
            <TablePaginate
              length={meta?.total}
              meta={meta}
              setPage={(e) => {
                setFilter({
                  ...filter,
                  page: e,
                })
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button
            className={'text-white rounded-full'}
            onClick={() => {
              form.setValue(name, listUser)
              setOpen(!open)
            }}
          >
            <FaSave className={'text-yellow-500'} />
            Simpan
          </Button>
        </div>
      </div>
    </>
  )
}
export default TableSelectSdm
