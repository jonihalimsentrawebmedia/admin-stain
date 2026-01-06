import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddProvince from './components/ButtonAddProvince'
import ProvinceViewModel from './ProvinceViewModel'
import useGetProvince from './controller/useGetProvince'

const ProvinceView = () => {
  const { columns, optionCountry } = ProvinceViewModel()
  const { loading, province, meta } = useGetProvince()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Provinsi"
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddProvince optionCountry={optionCountry} />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={province}
      
        loading={loading}
        meta={meta}
        tdClassName='whitespace-pre-line text-start'
        thClassName='whitespace-pre-line text-start'
        placeHolderSearch="Cari Provinsi"
      />
    </div>
  )
}

export default ProvinceView
