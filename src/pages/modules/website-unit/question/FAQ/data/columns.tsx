import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import { Button } from '@/components/ui/button.tsx'
import { MdDownload } from 'react-icons/md'
import { ButtonDeleteFAQUnit } from '../components/buttonDelete'
import { ButtonEditFAQUnit } from '../components/buttonEdit.tsx'

export const ColumnsFAQUnit = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IFAQList>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row?.index + 1}</>,
    },
    {
      accessorKey: 'nama_kategori_faq',
      header: 'Kategori',
    },
    {
      accessorKey: 'pertanyaan',
      header: 'Pertanyaan',
    },
    {
      accessorKey: 'jawaban',
      header: 'Jawaban',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div>
            <div
              className={'tiptap ProseMirror simple-editor'}
              dangerouslySetInnerHTML={{ __html: data?.jawaban ?? '' }}
            />

            <div className={'flex flex-col gap-1.5 mt-1'}>
              {data?.dokumens?.map((item, index) => (
                <Link to={item} target={'_blank'} key={index}>
                  <Button
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    Dokumen {index + 1}
                    <MdDownload />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex gap-2 justify-end'}>
            <ButtonEditFAQUnit data={data} />
            <ButtonDeleteFAQUnit data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
