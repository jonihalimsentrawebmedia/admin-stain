import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddLandingUnit } from './components/buttonAdd.tsx'
import { UnitLandingPageColumns } from './data/columns'
import { UseGetUnitLandingPage } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const LandingPageUnit = () => {
  const columns = UnitLandingPageColumns()
  const { meta, unitLanding, loading } = UseGetUnitLandingPage()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Landing Page'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Landing Page" valueGuide="PERPUSTAKAAN_PENGATURAN_LANDING_PAGE" />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddLandingUnit />,
            },
          ]}
        />

        <TableCustom data={unitLanding} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
