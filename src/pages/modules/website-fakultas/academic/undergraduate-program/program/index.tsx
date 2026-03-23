import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddProgram } from './component/buttonAdd.tsx'

export const UnderGraduatedProgram = () => {
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddProgram />,
            },
          ]}
          label="International Undergraduate Program  - Daftar Program"
        />
      </div>
    </>
  )
}
