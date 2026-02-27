import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetResearchPlanDetail } from '@/pages/modules/LPPM/research/plan/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetPlanResearchDocument } from '@/pages/modules/LPPM/research/plan/document/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ButtonAddDocumentResearchPlan } from '@/pages/modules/LPPM/research/plan/document/component/buttonAdd.tsx'
import { ColumnsDocumentResearchPlan } from '@/pages/modules/LPPM/research/plan/document/data/columns.tsx'

export const DocumentPLanResearch = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { detail, loading: load1 } = UseGetResearchPlanDetail(id ?? '')
  const {
    document,
    loading: load2,
    meta,
  } = UseGetPlanResearchDocument({
    limit: limit,
    id_kategori: (id as string) ?? '',
    page: page,
    search: search,
  })

  const loading = load1 || load2
  const columns = ColumnsDocumentResearchPlan()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          label={`Daftar Dokumen - ${detail?.nama_kategori}`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddDocumentResearchPlan />,
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
