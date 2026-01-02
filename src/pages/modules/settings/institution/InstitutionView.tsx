import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import InstitutionViewModel from './InstitutionViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'

const InstitutionView = () => {
  const { columns, goToAdd } = InstitutionViewModel()
  const { loading, satuanOrganisasi, meta } = useGetSatuanOrganisasi({
    kelompok: 'LEMBAGA',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Lembaga"
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
        loading={loading}
        data={satuanOrganisasi}
        meta={meta}
        isShowChoiceColumn
      />
    </div>
  )
}

export default InstitutionView
