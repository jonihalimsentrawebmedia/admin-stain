import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetPublication } from '@/pages/modules/website-utama/publication/List-data/hooks'
import { ColumnsPublicationList } from '@/pages/modules/website-utama/publication/List-data/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useParams } from 'react-router-dom'
import { ButtonAddPublication } from '@/pages/modules/website-utama/publication/List-data/component/buttonAdd.tsx'

const ListDataPublication = () => {
  const { meta, loading, year } = UseGetPublication()
  const columns = ColumnsPublicationList()
  const { id } = useParams()

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
