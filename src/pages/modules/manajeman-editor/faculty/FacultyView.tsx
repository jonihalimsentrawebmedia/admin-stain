import TableCustom from '@/components/common/table/TableCustom'
import FacultyViewModel from './FacultyViewModel'

import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetSatuanOrganisasi from '../controller/useGetSatuanOrganisasi'
import SubmissionButton from '../components/buttonSumission/SubmissionButton'

const FacultyView = () => {
  const { columns } = FacultyViewModel()
  const { satuanOrganisasi, loading, meta } = useGetSatuanOrganisasi({
    kelompok: 'FAKULTAS',
  })
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Data Fakultas"
        buttonGroup={[
          {
            type: 'custom',
            element: <SubmissionButton kelompok="FAKULTAS" />,
          },
        ]}
      />
      <TableCustom
        loading={loading}
        columns={columns}
        data={satuanOrganisasi}
        meta={meta}
        isShowChoiceColumn
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default FacultyView
