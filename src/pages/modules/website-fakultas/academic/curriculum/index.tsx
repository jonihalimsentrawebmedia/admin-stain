import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'
import ProdiCurriculumColumns from './data/columns'

const ProdiCurriculumView = () => {
  const { session } = UseGetSessionFaculty()
  const {
    satuanOrganisasi: prodi,
    loading,
    meta,
  } = UseGetSatuanOrganisasi({
    kelompok: 'PRODI',
    idParent: session?.id_fakultas || '',
  })
  const { columns } = ProdiCurriculumColumns()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Program Studi" />
      <TableCustom
        addFilter={
          <div className="flex gap-4">
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          </div>
        }
        columns={columns}
        data={prodi}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default ProdiCurriculumView
