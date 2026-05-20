import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddFooterService } from '@/pages/modules/pusat-karir/service/Footer/component/buttonAdd.tsx'
import { UseGetFooterService } from '@/pages/modules/pusat-karir/service/Footer/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsService } from '@/pages/modules/pusat-karir/service/Footer/data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const FooterServicePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { service, meta, loading } = UseGetFooterService({
    page,
    limit,
    search,
  })
  const columns = ColumnsService()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Posisi Footer'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Posisi Footer'}
                  valueGuide="PUSAT_KARIR_POSISI_FOOTER"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddFooterService />,
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
          data={service}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
