import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { UseGetDocumentSystem } from '@/pages/modules/SPI/quality-assurance/document-system/hooks'
import { ColumnsSystemDocument } from '@/pages/modules/SPI/quality-assurance/document-system/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const DocumentSystemPage = () => {
  const navigate = useNavigate()
  const { document, meta, loading } = UseGetDocumentSystem()
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
