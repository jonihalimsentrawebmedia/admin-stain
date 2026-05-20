import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsChiefOfficer } from './data/columns.tsx'
import { UseGetChiefOfficerGroup } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddChiefOfficer } from './component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const HumanResourcePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = ColumnsChiefOfficer()
  const { chiefOfficer, meta, loading } = UseGetChiefOfficerGroup({
    page,
    limit,
    search,
  })

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Pimpinan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Pimpinan'}
                  valueGuide="SPI_TENTANG_SUMBER_DAYA_MANUSIA"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddChiefOfficer />,
            },
          ]}
        />
        <TableCustom data={chiefOfficer} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
