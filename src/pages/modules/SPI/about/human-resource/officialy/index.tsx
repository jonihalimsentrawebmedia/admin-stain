import { UseGetChiefOfficerDetail } from './../hooks/index'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetOfficially } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddOfficially } from './component/buttonadd.tsx'
import { ColumnsOfficially } from './data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const OfficiallyDataSPI = () => {
  const { id } = useParams()
  const { detail } = UseGetChiefOfficerDetail((id as string) ?? '')
  const { officially, loading, meta } = UseGetOfficially({
    id_group: (id as string) ?? '',
  })
  const columns = ColumnsOfficially()

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
              element: <ButtonAddOfficially />,
            },
          ]}
        />

        <TableCustom data={officially} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
