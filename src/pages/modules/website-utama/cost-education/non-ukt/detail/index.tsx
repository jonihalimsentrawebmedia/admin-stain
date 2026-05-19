import { UseGetDetailCostNonUkt } from '@/pages/modules/website-utama/cost-education/non-ukt/hook'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsUtkTariffType } from '@/pages/modules/website-utama/cost-education/non-ukt/detail/data/columns.tsx'
import { useEffect, useState } from 'react'
import { TableBasicState } from '@/components/common/table/tableUsestate.tsx'
import { ButtonPublish } from '@/pages/modules/website-utama/cost-education/non-ukt/detail/component/buttonPublish.tsx'

const DetailCostEducationNonUktPage = () => {
  const { id } = useParams()
  const { detailCost, loading } = UseGetDetailCostNonUkt(id as string)
  const columns = ColumnsUtkTariffType()

  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    const temp = [...selected]
    detailCost?.biaya_list
      ?.filter((row) => row.aktif)
      .map((row) => {
        temp.push(row?.id_jenis_tarif)
      })
    setSelected(temp as any)
  }, [detailCost])

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label="Lihat Bawaan Tarif " isBack buttonGroup={[]} />
        <p className="text-gray-500">Nama Prodi</p>
        <div className="flex items-center justify-between">
          <p className="text-primary text-2xl font-semibold">
            {detailCost?.nama_prodi} ({detailCost?.kode_jenjang} -{' '}
            {detailCost?.nama_jenjang_pendidikan}) - Jalur Masuk {detailCost?.nama_jalur_masuk}
          </p>
          <ButtonPublish data={detailCost} />
        </div>

        <TableBasicState
          rowIdKey={'id_jenis_tarif'}
          selected={selected}
          onSelectedRowsChange={setSelected}
          data={detailCost?.biaya_list ?? ([] as any)}
          loading={loading}
          columns={columns as any}
        />
      </div>
    </>
  )
}
export default DetailCostEducationNonUktPage
