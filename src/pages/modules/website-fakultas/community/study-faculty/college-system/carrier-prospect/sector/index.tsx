import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddSectorCarrierProspect } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/sector/component/buttonAdd.tsx'

export const SectorCarrierProspect = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Sektor Pekerjaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddSectorCarrierProspect />,
            },
          ]}
        />
      </div>
    </>
  )
}
