import { UseGetChiefOfficerDetail } from './../hooks/index'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetOfficial } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddOfficial } from './component/buttonAdd.tsx'
import { ColumnsOfficial } from './data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const OfficialDataSPI = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { detail } = UseGetChiefOfficerDetail((id as string) ?? '')
  const { official, loading, meta } = UseGetOfficial({
    id_group: (id as string) ?? '',
    page,
    limit,
    search,
  })
  const columns = ColumnsOfficial()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={`Lihat Pejabat - ${detail?.nama_kelompok}`}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={`Lihat Pejabat - ${detail?.nama_kelompok}`}
                  valueGuide="SPI_TENTANG_SUMBER_DAYA_MANUSIA_PEJABAT"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddOfficial />,
            },
          ]}
        />

        <TableCustom data={official} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
