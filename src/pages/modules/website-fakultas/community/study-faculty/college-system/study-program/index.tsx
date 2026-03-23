import { ButtonAddStudyProgram } from './component/buttonAdd.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const CommunityStudyProgram = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Program Pendidikan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddStudyProgram />,
            },
          ]}
        />
      </div>
    </>
  )
}
