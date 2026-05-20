import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { BottonSelectTypeVacancy } from './component/BottonType.tsx'
import { UseGetListInternshipVacancy } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsInternship } from './data/columns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const ServiceInternshipVacancy = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { internshipVacancy, meta, loading } = UseGetListInternshipVacancy({
    page,
    limit,
    search,
  })

  const columns = ColumnsInternship()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Lowongan Magang'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Lowongan Magang'}
                  valueGuide="PUSAT_KARIR_LAYANAN_LOWONGAN_MAGANG"
                />
              ),
            },
            {
              type: 'custom',
              element: <BottonSelectTypeVacancy />,
            },
          ]}
        />

        <TableCustom data={internshipVacancy} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
