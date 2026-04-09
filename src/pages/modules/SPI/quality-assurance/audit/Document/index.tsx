import { UseGetDocumentList } from './hooks/index.tsx'
import { useNavigate } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsAuditDocument } from '@/pages/modules/SPI/quality-assurance/audit/Document/data/columns.tsx'

export const DocumentAuditPage = () => {
  const navigate = useNavigate()
  const { document, meta, loading } = UseGetDocumentList()
  const columns = ColumnsAuditDocument()

  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          isBack
          label={'Dokumen Tinjauan Manajemen'}
          buttonGroup={[
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
