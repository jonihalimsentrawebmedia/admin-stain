import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ServiceAccreditationViewModel from './ServiceAccreditationViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import FilterSelect from '@/components/common/filter/filterBasic'

const ServiceAccreditationView = () => {
  const { columns } = ServiceAccreditationViewModel()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Akreditasi" />
      <FilterSelect
        placeholder="Prodi"
        selectClassName={'min-w-[8rem]'}
        label="Pilih Universitas / Prodi"
        name={'prodi_id'}
        data={[]}
      />
      <TableCustom
        addFilter={
          <FilterSelect
            placeholder="Limit"
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            data={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        columns={columns}
        data={[]}
        loading={false}
        isShowLimit={false}
      />
    </div>
  )
}

export default ServiceAccreditationView
