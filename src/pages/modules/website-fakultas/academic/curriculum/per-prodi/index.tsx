import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailProdi } from '@/pages/modules/website-utama/program-studi/controller/detailProdi.tsx'
import { useParams } from 'react-router-dom'
import { UseGetCurriculumPerProdi } from '../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ColumnsCurriculum } from './data/columns'
import { ButtonAddCurriculum } from './component/buttonAdd'
import { UseGetSessionFaculty } from '@/pages/modules/website-fakultas/component/select-session/get-seeion.tsx'

export const CurriculumPerProdi = () => {
  const { id } = useParams()
  const { detailProdi } = UseGetDetailProdi((id as string) ?? '')
  const { curriculum, loading, meta } = UseGetCurriculumPerProdi()
  const { session } = UseGetSessionFaculty()
  const columns = ColumnsCurriculum(session)

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCurriculum session={session} />,
            },
          ]}
          label="Kurikulum Program Studi"
          isBack
        />
        <p className="text-gray-500 text-sm">Program Studi</p>
        <p className="text-xl">{detailProdi?.nama}</p>
        <p className="text-gray-500 text-sm">Jenjang Pendidikan</p>
        <p className="text-base">
          {detailProdi?.kode_jenjang_pendidikan}-{detailProdi?.nama_jenjang_pendidikan}
        </p>

        <hr />

        <TableCustom
          addFilter={
            <SelectFilter
              label={'jlh Data'}
              selectClassName={'lg:min-w-[100px]'}
              options={[
                { label: '10', value: '10' },
                { label: '25', value: '25' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
              ]}
            />
          }
          data={curriculum}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
