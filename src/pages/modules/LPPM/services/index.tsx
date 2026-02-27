import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup.tsx";
import {UseGetServices} from "@/pages/modules/LPPM/services/hooks";
import {useSearchParams} from "react-router-dom";
import {ColumnsService} from "@/pages/modules/LPPM/services/data/columns.tsx";
import TableCustom from "@/components/common/table/TableCustom.tsx";
import SelectFilter from "@/components/common/filter/SelectFilter.tsx";
import {ButtonAddService} from "@/pages/modules/LPPM/services/component/buttonAdd.tsx";

export const ServicesListPage = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const {service, meta, loading} = UseGetServices({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsService()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup label={'Layanan'} buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddService/>
          }
        ]}/>

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
          data={service} columns={columns} loading={loading} meta={meta}/>
      </div>
    </>
  )
}