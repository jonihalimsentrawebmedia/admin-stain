import { Button } from '@/components/ui/button.tsx'
import { MdSearch } from 'react-icons/md'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import {
  type IHumanResource,
  UseGetHumanResource,
} from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import PaginationState from '@/components/common/paginationState'
import type { UseFormReturn } from 'react-hook-form'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import Search from '@/components/common/table/Search.tsx'

interface Props {
  form: UseFormReturn<any>
}

const DialogHumanResources = (props: Props) => {
  const { form } = props
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
    id_unit_kerja: '',
  })
  const { institution } = UseGetUnitInstitution()
  const { humanResource, meta } = UseGetHumanResource({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
    id_unit_kerja: filter.id_unit_kerja ?? '',
  })
  const Columns = ReturnColumns({
    form,
    open: open,
    setOpen: setOpen,
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
        Pilih Penandatangan
      </Button>

      <DialogBasic
        title={'Pilih Penandatangan'}
        open={open}
        setOpen={setOpen}
        className={'min-w-5xl'}
      >
        <div className={'flex items-center gap-4 justify-between w-full'}>
          <SelectBasic
            showReset
            label={'Satuan Kerja'}
            placeholder={'Pilih Satuan Kerja'}
            isRow
            className={'w-full! flex whitespace-nowrap'}
            innerClassName={'w-full!'}
            value={filter.id_unit_kerja}
            data={
              institution?.map((row) => ({
                label: row.nama,
                value: row.id_satuan_organisasi,
              })) ?? []
            }
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                id_unit_kerja: e,
              }))
            }}
          />
          <Search
            innerClassName={'p-1.5'}
            className={'p-1.5'}
            position={'end'}
            onSearch={(e) => {
              setFilter((prev) => ({
                ...prev,
                search: e,
              }))
            }}
          />
        </div>
        <div>
          <TableCustom
            columns={Columns}
            meta={meta}
            tdClassName={'text-xs'}
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
export default DialogHumanResources

const ReturnColumns = ({
  form,
  setOpen,
  open,
}: {
  form: UseFormReturn<any>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
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
      accessorKey: 'nidn',
      header: 'NIDN',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Satuan Kerja',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Button
              onClick={() => {
                form.setValue('id_penandatangan', data.id_sdm ?? '')
                form.setValue('nama_penandatangan', data.nama ?? '')
                form.setValue('nip_penandatangan', data?.nip ?? '')
                form.setValue('nidn_penandatangan', data?.nidn ?? '')
                form.setValue('jabatan_penandatangan', data?.jabatan?.[0] ?? '')
                form.setValue('id_satuan_kerja_penandatangan', data?.id_unit_kerja ?? '')
                setOpen(!open)
              }}
              className={'text-white'}
            >
              Pilih
            </Button>
          </>
        )
      },
    },
  ]

  return Columns
}
