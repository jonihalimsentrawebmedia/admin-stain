import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import UnitViewModel from './UnitViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'
import SubmissionButton from '../components/buttonSumission/SubmissionButton'

const UnitView = () => {
  const { columns, } = UnitViewModel()
  const { loading, satuanOrganisasi } = useGetSatuanOrganisasi({
    kelompok: 'UNIT',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Unit"
        buttonGroup={[
          {
            type: 'custom',
            element: <SubmissionButton kelompok="UNIT" />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={satuanOrganisasi}
        loading={loading}
        placeHolderSearch="Cari Unit"
        isShowChoiceColumn
      />
    </div>
  )
}

export default UnitView
