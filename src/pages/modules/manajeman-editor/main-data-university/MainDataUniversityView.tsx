import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'
import TableCustom from '@/components/common/table/TableCustom'
import MainDataUniversityViewModel from './MainDataUniversityViewModel'
import SubmissionButton from '../components/buttonSumission/SubmissionButton'

const MainDataUniversityView = () => {
  const { columns} = MainDataUniversityViewModel()
  const { loading, satuanOrganisasi, meta } = useGetSatuanOrganisasi({
    kelompok: 'UNIVERSITAS',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Universitas"
        buttonGroup={[
          {
            type: 'custom',
            element: <SubmissionButton kelompok="UNIVERSITAS" />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={satuanOrganisasi}
        loading={loading}
        placeHolderSearch="Cari Universitas"
        meta={meta}
        isShowChoiceColumn
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default MainDataUniversityView
