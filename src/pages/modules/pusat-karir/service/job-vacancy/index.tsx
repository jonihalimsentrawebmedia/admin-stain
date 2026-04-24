import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BottonSelectTypeVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/component/BottonType.tsx'
import { UseGetListJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/hoooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ServiceJobVacancy = () => {
  const { jobVacancy, meta, loading } = UseGetListJobVacancy()

  const columns = ColumnsJobVacancy()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Lowongan Pekerjaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Lowongan Pekerjaan'}
                  valueGuide="PUSAT_KARIR_LAYANAN_LOWONGAN_PEKERJAAN"
                />
              ),
            },
            {
              type: 'custom',
              element: <BottonSelectTypeVacancy />,
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[150px]'}
              label={'Jenis Pekerjaan'}
              options={['FULLTIME', 'PARTTIME', 'FREELANCE', 'CONTRACT', 'MAGANG']?.map((row) => ({
                label: row,
                value: row,
              }))}
              name={'type'}
            />
          }
          data={jobVacancy}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
