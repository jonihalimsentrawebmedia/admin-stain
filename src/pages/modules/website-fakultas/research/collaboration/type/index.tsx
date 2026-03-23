import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddType } from '@/pages/modules/website-fakultas/research/collaboration/type/component/buttonAdd.tsx'

export const TypeOurPartners = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Bidang Kolaborasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddType />,
            },
          ]}
        />
      </div>
    </>
  )
}
