import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetAward } from './hooks/index'
import { ColumnsAward } from './data/columns'
import { ButtonAddAward } from '@/pages/modules/SPI/award/component/buttonAdd.tsx'

export const AwardListPage = () => {
  const { award, meta, loading } = UseGetAward()
  const columns = ColumnsAward()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          label={'Penghargaan'}
          buttonGroup={[
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
