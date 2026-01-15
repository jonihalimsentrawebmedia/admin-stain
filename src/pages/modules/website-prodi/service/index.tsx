import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddServiceProdi } from '@/pages/modules/website-prodi/service/components/buttonAdd.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsServiceProdi } from '@/pages/modules/website-prodi/service/data/columns.tsx'
import { UseGetServiceProdi } from '@/pages/modules/website-prodi/service/hooks'

export const ServiceProdiPage = () => {
  const { serviceProdi, loading, meta } = UseGetServiceProdi()
  const columns = ColumnsServiceProdi()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddServiceProdi />,
            },
          ]}
          label="Layanan"
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
          columns={columns}
          data={serviceProdi}
          meta={meta}
          loading={loading}
          isShowLimit={false}
        />
      </div>
    </>
  )
}
