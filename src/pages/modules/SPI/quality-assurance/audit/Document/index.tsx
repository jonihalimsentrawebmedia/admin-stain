import { UseGetDocumentList } from './hooks/index.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsAuditDocument } from '@/pages/modules/SPI/quality-assurance/audit/Document/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const DocumentAuditPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { document, meta, loading } = UseGetDocumentList({
    page,
    limit,
    search,
  })
  const columns = ColumnsAuditDocument()

  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          isBack
          label={'Dokumen Tinjauan Manajemen'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Dokumen Tinjauan Manajemen'}
                  valueGuide="SPI_JAMINAN_MUTU_TINJUAUAN_MANAJEMEN_DOKUMEN"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />
        <TableCustom data={document} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
