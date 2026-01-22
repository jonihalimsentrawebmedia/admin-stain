import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import FilterSelect from '@/components/common/filter/filterBasic.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetInboxUnit } from '@/pages/modules/website-unit/question/inbox/hooks'
import { ColumnsInboxUnit } from '@/pages/modules/website-unit/question/inbox/data/columns.tsx'

export const InboxMessageUnit = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { inboxMessage, meta, loading } = UseGetInboxUnit({
    limit: limit,
    page: page,
    search: search,
  })
  const columns = ColumnsInboxUnit()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup label={'Kotak Masuk'} buttonGroup={[]} />

        <FilterSelect
          label={'status'}
          name={'status'}
          placeholder={'Status'}
          className={'flex items-center gap-x-12 flex-row w-[15rem]'}
          selectClassName={'w-[15rem]'}
          data={[
            { value: 'Y', label: 'Sudah Dijawab' },
            { value: 'N', label: 'Belum Dijawab' },
          ]}
        />

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
          data={inboxMessage}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
