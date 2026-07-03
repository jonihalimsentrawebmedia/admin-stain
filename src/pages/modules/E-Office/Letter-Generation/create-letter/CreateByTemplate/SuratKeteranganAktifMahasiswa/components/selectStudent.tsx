// UseGetStudentData

import { Button } from '@/components/ui/button.tsx'
import { MdSearch } from 'react-icons/md'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import PaginationState from '@/components/common/paginationState'
import type { UseFormReturn } from 'react-hook-form'
import { UseGetStudentStatusLetter } from '@/pages/modules/E-Office/reference/studentStatusLetter/hook.tsx'
import type { IStudentDataStatus } from '@/pages/modules/E-Office/reference/studentStatusLetter/types.ts'

interface Props {
  form: UseFormReturn<any>
}

const DialogSelectStudents = (props: Props) => {
  const { form } = props
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
  })
  const { student, meta } = UseGetStudentStatusLetter({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
    tanggal_mulai: form.watch('tanggal_mulai') ?? '',
    tanggal_selesai: form.watch('tanggal_selesai') ?? '',
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
        Pilih Mahasiswa
      </Button>

      <DialogBasic title={'Pilih Mahasiswa'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <div>
          <TableCustom
            columns={Columns}
            meta={meta}
            columnsName={['']}
            thClassName={'bg-primary text-white'}
            data={student}
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
export default DialogSelectStudents

const ReturnColumns = ({
  form,
  setOpen,
  open,
}: {
  form: UseFormReturn<any>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const Columns: ColumnDef<IStudentDataStatus>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1}</p>
      },
    },
    {
      accessorKey: 'nama_mahasiswa',
      header: 'Nama Mahasiswa',
    },
    {
      accessorKey: 'nim',
      header: 'NIM',
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Program Studi',
    },
    {
      accessorKey: 'nama_fakultas',
      header: 'Nama Fakultas',
    },
    {
      accessorKey: 'nama_jenjang_pendidikan',
      header: 'Jenjang',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            {data?.nama_jenjang_pendidikan} ({data?.kode_jenjang_pendidikan})
          </>
        )
      },
    },
    {
      accessorKey: 'semester_masuk',
      header: 'Semester',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <Button
              disabled={!data?.is_available_kkn_magang}
              onClick={() => {
                form.setValue('id_mahasiswa', data.id_mahasiswa ?? '')
                form.setValue('nama_mahasiswa', data.nama_mahasiswa ?? '')
                form.setValue('nim', data?.nim ?? '')
                form.setValue('prodi', data?.nama_prodi ?? '')
                form.setValue('Fakultas', data?.nama_fakultas ?? '')
                form.setValue('jenjang', data?.nama_jenjang_pendidikan ?? '')
                form.setValue('semester', data?.semester_masuk ?? '')
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
