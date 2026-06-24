import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetAdvantage } from '@/pages/modules/Pulsikom/advantage/hooks'
import { ColumnsAdvantage } from '@/pages/modules/Pulsikom/advantage/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const AdvantagePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { advantage, loading, meta } = UseGetAdvantage({
    page,
    limit,
    search,
  })
  const columns = ColumnsAdvantage()

  return (
    <>
      <div className={'space-y-5 w-full'}>
        <ButtonTitleGroup
          label={'Keunggulan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Keunggulan'} valueGuide="PUSILKOM_KEUNGULAN" />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Keunggulan',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={advantage} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
