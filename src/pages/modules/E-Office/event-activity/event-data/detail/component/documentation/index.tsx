import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import ButtonAddDocumentation from './buttonAdd.tsx'
import { UseGetDocumentation } from './hooks.tsx'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { IoMdLink } from 'react-icons/io'
import ButtonEditDocumentation from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/buttonEdit.tsx'
import { ButtonDeleteDocumentation } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/documentation/buttonDelete.tsx'
import TablePaginate from '@/components/common/table/TablePagination.tsx'

const DocumentationEventActivity = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { file, meta } = UseGetDocumentation({
    id_acara: id as string,
    page,
    search,
    limit,
  })

  return (
    <>
      <Card className={'shadow-none p-3 rounded-lg'}>
        <CardContent className={'p-3 flex flex-col gap-3'}>
          <ButtonTitleGroup
            label={'Dokumentasi'}
            buttonGroup={[{ type: 'custom', element: <ButtonAddDocumentation /> }]}
          />

          <div className="grid grid-cols-3 gap-4">
            {file
              ?.filter((row) => row?.jenis_file === 'UPLOAD')
              .map((row, k) => (
                <div key={k} className={'relative'}>
                  <div className="top-1 right-1 absolute flex gap-1.5">
                    <ButtonEditDocumentation data={row} />
                    <ButtonDeleteDocumentation data={row} />
                  </div>
                  <img
                    src={row?.dokumen}
                    alt="gambar"
                    className="w-full h-[170px] object-contain bg-gray-100 shadow rounded-lg"
                  />
                  <p>{row?.keterangan}</p>
                </div>
              ))}
            {file
              ?.filter((row) => row?.jenis_file === 'URL')
              ?.map((row, k) => (
                <div
                  key={k}
                  className={
                    'relative flex items-center  justify-between gap-1.5 border border-primary p-2.5 rounded-lg'
                  }
                >
                  <Link to={row?.url_file} target="_blank" className="flex items-center gap-1.5">
                    <IoMdLink className={'size-10'} />
                    <p className="font-semibold text-primary">URL Dokumentasi</p>
                  </Link>
                  <div className={'flex gap-1.5'}>
                    <ButtonEditDocumentation data={row} />
                    <ButtonDeleteDocumentation data={row} />
                  </div>
                </div>
              ))}
          </div>

          {meta && (
            <TablePaginate
              length={meta?.total}
              meta={meta}
              setPage={(e) => {
                const params = new URLSearchParams()
                params.append('page', e)
                setSearchParams(params?.toString())
              }}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DocumentationEventActivity
