import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BottonSelectTypeVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/BottonType.tsx'

export const ServiceJobVacancy = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Lowongan Pekerjaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <BottonSelectTypeVacancy />,
            },
          ]}
        />
      </div>
    </>
  )
}
