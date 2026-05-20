import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { UseGetAcademicResource } from '@/pages/modules/website-utama/services/academic-resource/hooks'
import { useSearchParams } from 'react-router-dom'
import ButtonAddAcademicResource from '@/pages/modules/website-utama/services/academic-resource/component/buttonAdd.tsx'
import { ColumnsAcademicResource } from '@/pages/modules/website-utama/services/academic-resource/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const AcademicResourcePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { academicResource, loading, meta } = UseGetAcademicResource({
    page: page,
    limit: limit,
    search: search,
  })
  const coloumns = ColumnsAcademicResource()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Academic Resource'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Academic Resource"
                  valueGuide="WEBSITE_UTAMA_ACADEMIC_RESOURCE"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddAcademicResource />,
            },
          ]}
        />

        <TableCustom columns={coloumns} data={academicResource} loading={loading} meta={meta} />
      </div>
    </>
  )
}
export default AcademicResourcePage
