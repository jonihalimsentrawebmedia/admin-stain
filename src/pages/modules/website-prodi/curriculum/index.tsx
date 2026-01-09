import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetProdiSession } from '@/pages/modules/website-prodi/hooks'
import { ButtonAddCurriculum } from '@/pages/modules/website-prodi/curriculum/components/buttonAdd.tsx'
import { UseGetCurriculum } from '@/pages/modules/website-prodi/curriculum/hook'
import { ColumnsCurriculum } from '@/pages/modules/website-prodi/curriculum/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { useSearchParams } from 'react-router-dom'

export const CurriculumProdiPage = () => {
  const { session } = UseGetProdiSession()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { meta, curriculum, loading } = UseGetCurriculum({
    limit: limit,
    page: page,
    search: search,
  })
  const columns = ColumnsCurriculum(session)

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Kurikulum Program Studi'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddCurriculum session={session} /> }]}
        />

        <div className="flex flex-col gap-1.5">
          <p className="text-gray-500 text-sm">Program Studi</p>
          <p className="text-2xl font-semibold text-green-700">{session?.nama_prodi}</p>
        </div>

        <Separator />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          }
          columns={columns}
          data={curriculum}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
