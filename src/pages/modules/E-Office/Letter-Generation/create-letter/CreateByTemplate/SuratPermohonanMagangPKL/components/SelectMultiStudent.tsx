import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { MdDelete, MdSearch } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import PaginationState from '@/components/common/paginationState'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import { UseGetStudentStatusLetter } from '@/pages/modules/E-Office/reference/studentStatusLetter/hook.tsx'
import type { IStudentDataStatus } from '@/pages/modules/E-Office/reference/studentStatusLetter/types.ts'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import { SelectBasic } from '@/components/common/select/basic.tsx'
import { UseGetYearLevel } from '@/pages/modules/E-Office/students/student-data/hooks'
import { UseGetAdmissionProcess } from '@/pages/modules/E-Office/students/admission-process/hooks'
import LimitState from '@/components/common/table/limitState.tsx'
import Search from '@/components/common/table/Search.tsx'
import { TableBasicState } from '@/components/common/table/tableUsestate.tsx'
import { FaSave } from 'react-icons/fa'

interface Props {
  form: UseFormReturn<any>
}

const SelectMultiStudent = (props: Props) => {
  const { form } = props

  const [open, setOpen] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<IStudentDataStatus[]>([])
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

  const Stundent = useFieldArray({
    control: form.control,
    name: 'id_mahasiswa',
  }) as any
  const Stundents = form.watch('id_mahasiswa')

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
  })

  useEffect(() => {
    if (Stundents?.length && student?.length) {
      const filtered = student.filter((student) => Stundents.includes(student.id_mahasiswa))
      setSelectedStudents((prev) => {
        if (
          prev.length === filtered.length &&
          prev.every((s, i) => s.id_mahasiswa === filtered[i]?.id_mahasiswa)
        ) {
          return prev
        }
        return filtered
      })
    }
  }, [Stundents])

  const handleSelect = useCallback(
    (student: IStudentDataStatus) => {
      Stundent.append(student.id_mahasiswa)
      setSelectedStudents((prev) => {
        if (prev.some((s) => s.id_mahasiswa === student.id_mahasiswa)) return prev
        return [...prev, student]
      })
    },
    [Stundent]
  )

  const handleDelete = useCallback(
    (index: number) => {
      Stundent.remove(index)
      setSelectedStudents((prev) => prev.filter((_, i) => i !== index))
    },
    [Stundent]
  )

  const selectedIds = useMemo(() => selectedStudents.map((s) => s.id_mahasiswa), [selectedStudents])

  const dialogColumns = useMemo(
    () => ReturnDialogColumns({ onSelect: handleSelect, selectedIds }),
    [handleSelect, selectedIds]
  )

  const selectedColumns = useMemo(
    () => ReturnSelectedColumns({ onDelete: handleDelete }),
    [handleDelete]
  )

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

      {selectedStudents.length > 0 && (
        <div className="mt-4">
          <TableCustom
            columns={selectedColumns}
            columnsName={['#', 'Nama', 'NIM', 'Prodi', 'Aksi']}
            thClassName={'bg-primary text-white'}
            data={selectedStudents}
            isShowPagination={false}
            isShowFilter={false}
          />
        </div>
      )}

      <DialogBasic title={'Pilih Mahasiswa'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <div className="grid grid-cols-2 gap-2 gap-x-4">
          <SelectBasic
            showReset
            value={filter.id_fakultas}
            onChange={(e) => {
              console.log(e)
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
          <div className="max-h-[500px] overflow-y-scroll">
            <TableBasicState
              columns={dialogColumns}
              thClassName={'bg-primary text-white'}
              tdClassName={'text-xs p-1'}
              data={student}
              rowClassName={(row: IStudentDataStatus) =>
                selectedIds.includes(row.id_mahasiswa) || !row.is_available_kkn_magang
                  ? 'bg-gray-200'
                  : ''
              }
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
          <div className="flex items-center justify-end mt-2">
            <Button className={'text-white'}>
              <FaSave />
              Simpan
            </Button>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}

export default SelectMultiStudent

const ReturnDialogColumns = ({
  onSelect,
  selectedIds,
}: {
  onSelect: (student: IStudentDataStatus) => void
  selectedIds: string[]
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
        const isSelected = selectedIds.includes(data.id_mahasiswa) || !data.is_available_kkn_magang
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

const ReturnSelectedColumns = ({ onDelete }: { onDelete: (index: number) => void }) => {
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
      header: 'Nama',
    },
    {
      accessorKey: 'nim',
      header: 'NIM',
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Prodi',
    },
    {
      accessorKey: 'aksi',
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <Button
            type={'button'}
            variant={'destructive'}
            size={'icon'}
            onClick={() => onDelete(row.index)}
          >
            <MdDelete className="size-4" />
          </Button>
        )
      },
    },
  ]
  return Columns
}
