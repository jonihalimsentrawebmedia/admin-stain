import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UnitLandingPageColumns } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { UseGetFacultyLandingPage } from './hooks/index.tsx'
import { ButtonAddLandingFaculty } from './components/buttonAdd.tsx'

export const LandingPageFaculty = () => {
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
              element: (
                <ButtonGoToGuide
                  titleGuide={`Landing Page`}
                  valueGuide="FAKULTAS_PENGATURAN_LANDING_PAGE"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddLandingFaculty />,
            },
          ]}
        />

        <TableCustom
          isShowFilter={false}
          data={unitLanding}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
