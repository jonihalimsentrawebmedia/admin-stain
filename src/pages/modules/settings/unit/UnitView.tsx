import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import UnitViewModel from './UnitViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'

const UnitView = () => {
  const { columns, goToAdd } = UnitViewModel()
  const { loading, satuanOrganisasi, meta } = useGetSatuanOrganisasi({
    kelompok: 'UNIT',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Unit"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => goToAdd(),
            type: 'add',
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={satuanOrganisasi}
        meta={meta}
        loading={loading}
        placeHolderSearch="Cari Unit"
        isShowChoiceColumn
      />
    </div>
  )
}

export default UnitView
