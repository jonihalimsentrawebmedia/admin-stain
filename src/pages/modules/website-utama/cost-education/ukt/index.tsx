import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'
import { UseGetCostEducation } from '@/pages/modules/website-utama/cost-education/ukt/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsEducationCost } from '@/pages/modules/website-utama/cost-education/ukt/data/columns.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetEntrance } from '@/pages/modules/website-utama/cost-education/ukt/entrance-list/hooks'
import { SwitchStatus } from '@/pages/modules/website-utama/cost-education/ukt/component/switchStatus.tsx'
import { IoMdImage } from 'react-icons/io'

export const UKTCostEducationPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const faculty = searchParams.get('faculty') ?? ''
  const prodi = searchParams.get('prodi') ?? ''
  const level = searchParams.get('level') ?? ''
  const entrance = searchParams.get('entrance') ?? ''

  const { satuanOrganisasi: facultyList } = UseGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'FAKULTAS',
  })
  const { satuanOrganisasi: prodiList } = UseGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'PRODI',
    idParent: faculty,
  })
  const { educationalLevel } = UseGetEducationalLevel({ isGetAll: true })
  const { entrance: listEntrance } = UseGetEntrance({
    page: '0',
    limit: '0',
  })
  const { costEducation, meta, loading } = UseGetCostEducation({
    page,
    limit,
    search,
    id_fakultas: faculty,
    id_prodi: prodi,
    id_jenjang: level,
    id_jalur_masuk: entrance,
  })
  const columns = ColumnsEducationCost()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="UKT"
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  variant={'outline'}
                  onClick={() => {
                    navigate('level-ukt')
                  }}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <FaListUl />
                  Tingkat UKT
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button
                  variant={'outline'}
                  onClick={() => {
                    navigate('list-entrance')
                  }}
                  className={'border-primary text-primary hover:text-primary'}
                >
                  <FaListUl />
                  Daftar Jalur Masuk
                </Button>
              ),
            },
          ]}
        />

        <SwitchStatus type={'UKT'} />

        <div className="flex flex-col gap-5 max-w-[20rem]">
          <SelectFilter
            options={
              facultyList?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
            name={'faculty'}
            label={'Fakultas'}
          />
          <SelectFilter
            options={
              prodiList?.map((row) => ({
                label: row?.nama,
                value: row?.id_satuan_organisasi,
              })) ?? []
            }
            name={'prodi'}
            label={'Prodi'}
          />
          <SelectFilter
            options={
              educationalLevel?.map((row) => ({
                value: row?.id_jenjang,
                label: `${row?.kode_jenjang}-${row?.nama_jenjang}`,
              })) ?? []
            }
            name={'level'}
            label={'Jenjang'}
          />
          <SelectFilter
            options={
              listEntrance?.map((row) => ({
                value: row?.id_jalur_masuk,
                label: row?.nama_jalur_masuk,
              })) ?? []
            }
            name={'entrance'}
            label={'Jalur Masuk'}
          />
        </div>

        {faculty && prodi && (
          <TableCustom data={costEducation} columns={columns} meta={meta} loading={loading} />
        )}
      </div>
    </>
  )
}
