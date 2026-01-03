import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetProgramStudy from './controller/useGetProgramStudy'
import ProgramStudyViewModel from './ProgramStudyViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetListFakultas from './controller/useGetListFakultas'

const ProgramStudyView = () => {
  const { columns } = ProgramStudyViewModel()

  const { programStudy, loading, meta } = useGetProgramStudy()
  const { programStudy: fakultas } = useGetListFakultas()
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
            <SelectFilter
              selectClassName={'min-w-[15rem]'}
              label="Fakultas"
              name={'id_fakultas_asal'}
              options={fakultas.map((item) => {
                return {
                  label: item.nama,
                  value: item.id_satuan_organisasi,
                }
              })}
            />
          </div>
        }
        columns={columns}
        data={programStudy}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default ProgramStudyView
