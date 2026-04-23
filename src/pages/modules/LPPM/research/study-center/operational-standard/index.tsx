import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetDocumentStandardOperational } from './hooks/index'
import { ButtonAddStandardOperational } from './component/buttonAdd.tsx'
import { ColumnsGuideBook } from './data/columns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const StandardOperationalStudy = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { document, loading, meta } = UseGetDocumentStandardOperational({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsGuideBook()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          label={`Standar Operasional Pusat Studi`}
          buttonGroup={[
             {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="Standar Operasional Pusat Studi" valueGuide="LPPM_PUSAT_STUDI_STANDARD_OPERASIONAL" />,
            },
            {
              type: 'custom',
              element: <ButtonAddStandardOperational />,
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
          data={document}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
