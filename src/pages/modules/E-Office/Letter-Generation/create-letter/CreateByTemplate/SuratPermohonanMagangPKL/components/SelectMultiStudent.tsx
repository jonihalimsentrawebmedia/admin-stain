import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { UseGetStudentData } from '@/pages/modules/E-Office/students/student-data/hooks'
import { MdDelete, MdSearch } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import PaginationState from '@/components/common/paginationState'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudentData } from '@/pages/modules/E-Office/students/student-data/data/types.ts'

interface Props {
  form: UseFormReturn<any>
}

const SelectMultiStudent = (props: Props) => {
  const { form } = props
  const [open, setOpen] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<IStudentData[]>([])
  const Stundet = useFieldArray({
    control: form.control,
    name: 'id_mahasiswa',
  }) as any

  const handleSelect = useCallback(
    (student: IStudentData) => {
      const alreadySelected = selectedStudents.some(
        (s) => s.id_mahasiswa === student.id_mahasiswa
      )
      if (alreadySelected) return
      Stundet.append(student.id_mahasiswa)
      setSelectedStudents((prev) => [...prev, student])
    },
    [Stundet, selectedStudents]
  )

  const handleDelete = useCallback(
    (index: number) => {
      Stundet.remove(index)
      setSelectedStudents((prev) => prev.filter((_, i) => i !== index))
    },
    [Stundet]
  )

  const selectedIds = selectedStudents.map((s) => s.id_mahasiswa)

  const dialogColumns = ReturnDialogColumns({
    onSelect: handleSelect,
    selectedIds,
  })

  const selectedColumns = ReturnSelectedColumns({
    onDelete: handleDelete,
  })

  const [filter, setFilter] = useState({
    page: '1',
    limit: '10',
    search: '',
  })
  const { studentData, meta } = UseGetStudentData({
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
        <div>
          <TableCustom
            columns={dialogColumns}
            meta={meta}
            columnsName={['']}
            thClassName={'bg-primary text-white'}
            data={studentData}
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

export default SelectMultiStudent

const ReturnDialogColumns = ({
  onSelect,
  selectedIds,
}: {
  onSelect: (student: IStudentData) => void
  selectedIds: string[]
}) => {
  const Columns: ColumnDef<IStudentData>[] = [
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
        const isSelected = selectedIds.includes(data.id_mahasiswa)
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
  const Columns: ColumnDef<IStudentData>[] = [
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
