import type { ColumnDef } from '@tanstack/react-table'
import type { ISubjectDetail } from '@/pages/modules/website-prodi/curriculum/suject-detail/data/types.ts'
import { ButtonEditSubject } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/buttonEdit.tsx'
import { ButtonDeleteSubject } from '@/pages/modules/website-prodi/curriculum/suject-detail/component/buttonDelete.tsx'

export const ColumnsSubject = () => {
  const columns: ColumnDef<ISubjectDetail>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'nama_mata_kuliah',
      header: 'Mata Kuliah',
    },
    {
      accessorKey: 'sks',
      header: 'SKS',
    },
    {
      accessorKey: 'jenis_mata_kuliah',
      header: 'Jenis',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 justify-end'}>
            <ButtonEditSubject data={row?.original} />
            <ButtonDeleteSubject data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
