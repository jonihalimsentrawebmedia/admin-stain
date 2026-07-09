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
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { UseGetYearLevel } from '@/pages/modules/E-Office/students/student-data/hooks'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import LimitState from '@/components/common/table/limitState.tsx'
import Search from '@/components/common/table/Search.tsx'

interface Props {
  form: UseFormReturn<any>
  is_active?: string
}

const DialogSelectStudents = (props: Props) => {
  const { form, is_active } = props
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
    id_fakultas: '',
    id_prodi: '',
    angkatan: '',
    jalur_masuk: '',
  })
  const { institution } = UseGetUnitInstitution({
    kelompok: 'FAKULTAS',
  })
  const { institution: prodi } = UseGetUnitInstitution({
    kelompok: 'PRODI',
    parent_id: filter.id_fakultas ?? '',
  })
  const { yearLevel } = UseGetYearLevel()
  const { admissionProcess } = UseGetAdmissionProcess({ page: '0', limit: '0' })

  const { student, meta } = UseGetStudentStatusLetter({
    page: filter.page,
    limit: filter.limit,
    search: filter.search,
    tanggal_mulai: form.getValues('tanggal_mulai') ?? '',
    tanggal_selesai: form.getValues('tanggal_selesai') ?? '',
    id_fakultas: filter.id_fakultas ?? '',
    id_prodi: filter.id_prodi ?? '',
    angkatan: filter.angkatan ?? '',
    jalur_masuk: filter.jalur_masuk ?? '',
    is_active: is_active ?? '0',
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
        <div className="grid grid-cols-2 gap-2 gap-x-4">
          <SelectBasic
            showReset
            value={filter.id_fakultas}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                id_fakultas: e,
              }))
            }}
            className={'grid grid-cols-[7rem_1fr] items-center gap-2 w-full'}
            innerClassName={'w-full'}
            isRow
            label={'Fakultas'}
            placeholder={'Pilih Fakultas'}
            data={
              institution?.map((row) => ({
                label: row.nama,
                value: row.id_satuan_organisasi,
              })) ?? []
            }
          />
          <SelectBasic
            showReset
            value={filter.id_prodi}
            className={'grid grid-cols-[7rem_1fr] items-center gap-2 w-full'}
            innerClassName={'w-full'}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                id_prodi: e,
              }))
            }}
            isRow
            label={'Prodi'}
            placeholder={'Pilih Prodi'}
            data={
              prodi?.map((row) => ({
                label: row.nama,
                value: row.id_satuan_organisasi,
              })) ?? []
            }
          />
          <SelectBasic
            showReset
            value={filter.angkatan}
            className={'grid grid-cols-[7rem_1fr] items-center gap-2 w-full'}
            innerClassName={'w-full'}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                angkatan: e,
              }))
            }}
            isRow
            label={'angkatan'}
            placeholder={'Pilih angkatan'}
            data={
              yearLevel?.map((row) => ({
                label: row.toString(),
                value: row.toString(),
              })) ?? []
            }
          />
          <SelectBasic
            showReset
            value={filter.jalur_masuk}
            className={'grid grid-cols-[7rem_1fr] items-center gap-2 w-full'}
            innerClassName={'w-full'}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                jalur_masuk: e,
              }))
            }}
            isRow
            label={'Jalur Masuk'}
            placeholder={'Pilih Jalur Masuk'}
            data={[
              ...(admissionProcess?.map((row) => ({
                label: row.nama,
                value: row.id_mahasiswa_jalur_masuk,
              })) ?? []),
            ]}
          />
          <LimitState
            value={Number(filter.limit)}
            setLimit={(e) => {
              setFilter((prev) => ({
                ...prev,
                limit: e.toString(),
              }))
            }}
          />
          <Search
            className={'p-1.5'}
            innerClassName={'p-1.5 text-sm'}
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
          <div className={'max-h-[500px] overflow-y-auto'}>
            <TableCustom
              columns={Columns}
              meta={meta}
              columnsName={['']}
              thClassName={'bg-primary text-white'}
              tdClassName={'text-xs! p-1'}
              data={student}
              isShowPagination={false}
              isShowFilter={false}
            />
          </div>
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
                form.setValue('kode_jenjang', data?.kode_jenjang_pendidikan ?? '')
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
