import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ColumnsStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/data/columns.tsx'
import { UseGetStudyCenterList } from '@/pages/modules/LPPM/research/study-center/study-list/hook'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const StudyCenterList = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { studyCenter, meta, loading } = UseGetStudyCenterList({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsStudyCenter()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Pusat Studi'}
          buttonGroup={[
             {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="Pusat Studi" valueGuide="LPPM_PUSAT_STUDI" />,
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'w-[120px]'}
              name="limit"
              label="Jlh Data"
              options={[10, 25, 50, 100].map((item) => {
                return {
                  label: item.toString(),
                  value: item.toString(),
                }
              })}
            />
          }
          data={studyCenter}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
