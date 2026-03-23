import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddZoneIntegrityCategory } from '@/pages/modules/website-fakultas/zone-integrity/component/buttonAdd.tsx'

export const ZoneIntegrityPage = () => {
  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Zona Integritas'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddZoneIntegrityCategory />,
            },
          ]}
        />
      </div>
    </>
  )
}
