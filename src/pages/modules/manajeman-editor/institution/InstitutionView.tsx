import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import InstitutionViewModel from './InstitutionViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'
import SubmissionButton from '../components/buttonSumission/SubmissionButton'

const InstitutionView = () => {
  const { columns } = InstitutionViewModel()
  const { loading, satuanOrganisasi, meta } = useGetSatuanOrganisasi({
    kelompok: 'LEMBAGA',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Lembaga"
        buttonGroup={[
          {
            type: 'custom',
            element: <SubmissionButton kelompok="LEMBAGA" />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        loading={loading}
        data={satuanOrganisasi}
        meta={meta}
        isShowChoiceColumn
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default InstitutionView
