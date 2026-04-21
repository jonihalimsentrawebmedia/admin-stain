import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddLandingProdi } from './components/buttonAdd.tsx'
import { ProdiLandingPageColumns } from './data/columns'
import { UseGetProdiLandingPage } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const LandingPageProdi = () => {
  const columns = ProdiLandingPageColumns()
  const { meta, prodiLanding, loading } = UseGetProdiLandingPage()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Landing Page'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide valueGuide="PRODI_LANDING_PAGE" />,
            },
            {
              type: 'custom',
              element: <ButtonAddLandingProdi />,
            },
          ]}
        />

        <TableCustom data={prodiLanding} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
