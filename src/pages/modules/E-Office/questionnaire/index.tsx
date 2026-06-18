import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetQuestionnaire } from '@/pages/modules/E-Office/questionnaire/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsSurvey } from '@/pages/modules/E-Office/questionnaire/data/columns.tsx'

const QuestionnairePage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { questionnaire, loading, meta } = UseGetQuestionnaire({
    page,
    limit,
    search,
  })
  const columns = ColumnsSurvey()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Kuisioner'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  className={'text-white rounded-full'}
                  onClick={() => navigate('qualitative/add')}
                >
                  <FaCirclePlus />
                  Kuisioner Kualitatif
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  className={'text-white rounded-full'}
                  onClick={() => navigate('quantitative/add')}
                >
                  <FaCirclePlus />
                  Kuisioner Kuantitatif
                </Button>
              ),
            },
          ]}
        />
        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={questionnaire}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default QuestionnairePage
