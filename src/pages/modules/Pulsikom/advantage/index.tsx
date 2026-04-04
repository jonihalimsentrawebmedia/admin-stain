import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetAdvantage } from '@/pages/modules/Pulsikom/advantage/hooks'
import { ColumnsAdvantage } from '@/pages/modules/Pulsikom/advantage/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const AdvantagePage = () => {
  const navigate = useNavigate()
  const { advantage, loading, meta } = UseGetAdvantage()
  const columns = ColumnsAdvantage()

  return (
    <>
      <div className={'space-y-5 w-full'}>
        <ButtonTitleGroup
          label={'Keuntungan'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Keuntungan',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={advantage} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
