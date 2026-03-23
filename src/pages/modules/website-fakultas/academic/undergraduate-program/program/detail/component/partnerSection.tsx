import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPartner } from './buttonAdd'

export const PartnerSection = () => {
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Universitas Partner'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPartner />,
            },
          ]}
        />
      </div>
    </>
  )
}
