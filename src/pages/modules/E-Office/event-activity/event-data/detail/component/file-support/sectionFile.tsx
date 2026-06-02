import { Card, CardContent } from '@/components/ui/card.tsx'
import ButtonAddFileSupport from './buttonAdd.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetFileSupport } from './hooks.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsFileSupport } from './columns.tsx'

export const SectionFile = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { file, meta, loading } = UseGetFileSupport({
    id_acara: id as string,
    page,
    search,
    limit,
  })
  const columns = ColumnsFileSupport()

  return (
    <>
      <Card className={'shadow-none p-3 rounded-lg'}>
        <CardContent className={'p-3 flex flex-col gap-3'}>
          <div className="flex items-center justify-between">
            <div>
              <p className={'text-2xl font-semibold'}>File Pendukung Acara</p>
              <p className="text-blue-500 text-sm font-semibold">
                *Dapat berupa daftar hadir, surat undangan, dan sebagainya.
              </p>
            </div>
            <ButtonAddFileSupport />
          </div>

          <TableCustom data={file} columns={columns} meta={meta} loading={loading} />
        </CardContent>
      </Card>
    </>
  )
}
