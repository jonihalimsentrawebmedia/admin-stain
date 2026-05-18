import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaListUl } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Switch } from '@/components/ui/switch.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'

export const CostEducationUKT = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const faculty = searchParams.get('faculty') ?? ''

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

        <div className={'grid grid-cols-[15rem_1fr] gap-5'}>
          <p>Status Publish untuk Landing</p>
          <div className="flex items-center gap-4">
            <Switch />
            Ya
          </div>
        </div>

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
          <SelectFilter options={[]} name={'entrance'} label={'Jalur Masuk'} />
        </div>
      </div>
    </>
  )
}
