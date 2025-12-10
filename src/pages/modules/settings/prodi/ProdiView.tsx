import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import ProdiViewModel from './ProdiViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'

const ProdiView = () => {
  const { columns, goToAdd } = ProdiViewModel()
  const { loading, satuanOrganisasi, meta } = useGetSatuanOrganisasi({
    kelompok: 'PRODI',
  })
  const { satuanOrganisasi: fakultas } = useGetSatuanOrganisasi({
    kelompok: 'FAKULTAS',
    isFilter:true
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Prodi"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => goToAdd(),
            type: 'add',
          },
        ]}
      />

      <TableCustom
        addFilter={
          <SelectFilter
            name="id_parent"
            label="Fakultas Asal"
            options={fakultas.map((item) => {
              return {
                label: item.nama,
                value: item.id_satuan_organisasi,
              }
            })}
          />
        }
        columns={columns}
        data={satuanOrganisasi}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default ProdiView
