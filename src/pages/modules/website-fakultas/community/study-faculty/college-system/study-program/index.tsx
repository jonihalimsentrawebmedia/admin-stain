import { ButtonAddStudyProgram } from './component/buttonAdd.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStudyProgram } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCollegeSystemStudy } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/data/columns.tsx'

export const CommunityStudyProgram = () => {
  const { listStudyProgram, loading, meta } = UseGetStudyProgram()
  const columns = ColumnsCollegeSystemStudy()

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

        <TableCustom data={listStudyProgram} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
