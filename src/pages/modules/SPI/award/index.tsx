import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetAward } from './hooks/index'
import { ColumnsAward } from './data/columns'
import { ButtonAddAward } from '@/pages/modules/SPI/award/component/buttonAdd.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const AwardListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { award, meta, loading } = UseGetAward({
    page,
    limit,
    search,
  })
  const columns = ColumnsAward()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Penghargaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Penghargaan'} valueGuide="SPI_PENGHARGAAN" />,
            },
            {
              type: 'custom',
              element: <ButtonAddAward />,
            },
          ]}
        />
        <TableCustom data={award} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
