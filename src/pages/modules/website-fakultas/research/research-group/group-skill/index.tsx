import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetListGroupSkills } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsGroupSkill } from './data/columns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const GroupSkillResearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listGroupSkill, loading, meta } = UseGetListGroupSkills({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsGroupSkill()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          isBack
          label="Daftar Kelompok Keahlian"
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Daftar Kelompok Keahlian'}
                  valueGuide="FAKULTAS_PENELITIAN_KELOMPOK_KEAHLIAN_DAFTAR_KK"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom data={listGroupSkill} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
