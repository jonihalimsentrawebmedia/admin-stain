import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetListDRTPM } from './hooks/index'
import { ColumnsDataDRTPM } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const SchemaDataDRTPM = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { response, meta, loading } = UseGetListDRTPM({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsDataDRTPM()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Pendanan DRTPM'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Skema',
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
          data={response}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
