import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddLandingFaculty } from './components/buttonAdd.tsx'
import { UnitLandingPageColumns } from './data/columns'
import { UseGetFacultyLandingPage } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'

export const LandingPageCarrier = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = UnitLandingPageColumns()
  const { meta, unitLanding, loading } = UseGetFacultyLandingPage({
    page: page,
    limit: limit,
    search: search,
  })

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Landing Page'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLandingFaculty />,
            },
          ]}
        />

        <TableCustom data={unitLanding} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
