import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetSurvey } from '@/pages/modules/pusat-karir/survey/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import {
  ArchivedSurveyColumns,
  PublishSurveyColumns,
  SurveyColumns,
} from '@/pages/modules/pusat-karir/survey/data/columns.tsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { clsx } from 'clsx'

export const SurveyListPage = () => {
  const uuid = uuidv4()
  const navigate = useNavigate()

  const [searchParams, setSearchPrams] = useSearchParams()
  const status = searchParams?.get('status') ?? 'DRAFT'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { survey, loading, meta } = UseGetSurvey({
    page: page,
    limit: limit,
    search: search,
    status: status,
  })

  const columns = SurveyColumns()
  const columnsPublish = PublishSurveyColumns()
  const columnsArchive = ArchivedSurveyColumns()

  const TabsData = [
    {
      value: 'DRAFT',
      label: 'Draft',
      element: <TableCustom data={survey} columns={columns} loading={loading} meta={meta} />,
    },
    {
      value: 'DITERBITKAN',
      label: 'Diterbitkan',
      element: <TableCustom data={survey} columns={columnsPublish} loading={loading} meta={meta} />,
    },
    {
      value: 'DIARSIPKAN',
      label: 'Diarsipkan',
      element: <TableCustom data={survey} columns={columnsArchive} loading={loading} meta={meta} />,
    },
  ]

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

        <Tabs
          className={'flex flex-col gap-5 w-full'}
          value={status}
          onValueChange={(value) => {
            const params = new URLSearchParams()
            params.append('status', value)
            setSearchPrams(params)
          }}
        >
          <TabsList className={'rounded-none! bg-white! shadow-none! w-full flex gap-x-2 h-full'}>
            {TabsData?.map((row, k) => (
              <TabsTrigger
                key={k}
                value={row?.value}
                className={clsx(
                  'bg-white shadow-none! rounded p-2',
                  'data-[state=active]:bg-primary data-[state=active]:text-white',
                  'border-primary border'
                )}
              >
                {row?.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TabsData?.map((row, k) => (
            <TabsContent value={row.value} key={k} className={'w-full'}>
              {row?.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
