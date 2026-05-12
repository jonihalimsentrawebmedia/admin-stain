import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetPublication } from '@/pages/modules/website-utama/publication_depercated/list-data/hooks'
import { ColumnsPublicationList } from '@/pages/modules/website-utama/publication_depercated/list-data/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useParams } from 'react-router-dom'
import { ButtonAddPublication } from '@/pages/modules/website-utama/publication_depercated/list-data/component/buttonAdd.tsx'

const ListDataPublication = () => {
  const { id } = useParams()
  const { meta, loading, year } = UseGetPublication({
    id_tahun_publikasi: id as string,
  })
  const columns = ColumnsPublicationList()

  return (
    <>
      <div className={'space-y-4 py-5'}>
        <ButtonTitleGroup
          label={'Daftar Publikasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPublication id={id as string} />,
            },
          ]}
          isBack
        />
        <TableCustom columns={columns} data={year} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default ListDataPublication
