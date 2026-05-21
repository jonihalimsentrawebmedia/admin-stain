import { ButtonAddStudyProgram } from './component/buttonAdd.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetStudyProgram } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCollegeSystemStudy } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const CommunityStudyProgram = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listStudyProgram, loading, meta } = UseGetStudyProgram({
    page,
    limit,
    search,
  })
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
              element: (
                <ButtonGoToGuide
                  titleGuide={'Program Pendidikan'}
                  valueGuide="FAKULTAS_KOMUNITAS_KULIAH_SITEM_PERKULIAHAN_PROGRAM_PENDIDIKAN"
                />
              ),
            },
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
