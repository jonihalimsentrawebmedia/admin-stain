import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetRegency from './controller/useGetRegency'
import RegencyViewModel from './RegencyViewModel'
import ButtonAddRegency from './components/ButtonAddRegency'
import TableCustom from '@/components/common/table/TableCustom'

const RegencyView = () => {
  const { columns } = RegencyViewModel()
  const { loading, regency, meta } = useGetRegency()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Kabupaten"
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddRegency />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={regency}
        tdClassName="whitespace-pre-line text-start"
        thClassName="whitespace-pre-line text-start"
        loading={loading}
        meta={meta}
        placeHolderSearch="Cari Provinsi"
      />
    </div>
  )
}

export default RegencyView
