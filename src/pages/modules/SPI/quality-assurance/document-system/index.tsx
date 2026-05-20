import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { UseGetDocumentSystem } from '@/pages/modules/SPI/quality-assurance/document-system/hooks'
import { ColumnsSystemDocument } from '@/pages/modules/SPI/quality-assurance/document-system/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const DocumentSystemPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { document, meta, loading } = UseGetDocumentSystem({
    page,
    limit,
    search,
  })
  const columns = ColumnsSystemDocument()

  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Sistem Dokumen'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Sistem Dokumen'}
                  valueGuide="SPI_JAMINAN_MUTU_SITEM_DOKUMEN"
                />
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  variant={'outline'}
                  className={'border-primary text-primary hover:text-primary'}
                  onClick={() => navigate('category')}
                >
                  <FaListUl />
                  Kategori Dokumen
                </Button>
              ),
            },
            {
              type: 'add',
              label: 'Tambah Sistem Dokumen',
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
