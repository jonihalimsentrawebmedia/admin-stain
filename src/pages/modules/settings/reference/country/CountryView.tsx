import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetCountry from './controller/useGetCountry'
import CountryViewModel from './CountryViewModel'
import ButtonAddCountry from './components/ButtonAddCountry'
import TableCustom from '@/components/common/table/TableCustom'

const CountryView = () => {
  const { columns, } = CountryViewModel()
  const { loading, country, meta } = useGetCountry()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Negara"
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddCountry />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={country}
        thClassName="text-start"
        tdClassName="text-start"
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari Negara"
      />
    </div>
  )
}

export default CountryView
