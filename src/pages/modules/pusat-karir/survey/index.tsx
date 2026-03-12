import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetSurvey } from '@/pages/modules/pusat-karir/survey/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { SurveyColumns } from '@/pages/modules/pusat-karir/survey/data/columns.tsx'

export const SurveyListPage = () => {
  const uuid = uuidv4()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { survey, loading, meta } = UseGetSurvey({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = SurveyColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Survey'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Buat Survei',
              onClick: () => {
                window.localStorage.setItem('uuid', uuid)
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom data={survey} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
