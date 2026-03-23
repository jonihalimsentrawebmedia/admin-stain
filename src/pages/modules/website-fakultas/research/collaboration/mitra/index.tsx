import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/component/buttonAdd.tsx'

export const MitraOurPartners = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Bekerjasama Dengan Kami'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddMitra />,
            },
          ]}
        />
      </div>
    </>
  )
}
