import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'
import { MdInfo } from 'react-icons/md'
import ButtonEditTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/buttonEdit.tsx'
import ButtonDeleteTemplateType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/buttonDelete.tsx'

const ColumnsTypeTemplate = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITypeTemplateLetter>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_jenis_template',
      header: 'Nama Jenis Surat',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex gap-1.5 items-center justify-center">
              <Link
                to={`detail/${data?.id_mail_jenis_template_surat}`}
                className={'p-1.5 rounded bg-blue-500 text-white hover:bg-blue-600'}
              >
                <MdInfo />
              </Link>
              <ButtonEditTypeTemplate data={data} />
              <ButtonDeleteTemplateType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return { columns }
}

export default ColumnsTypeTemplate
