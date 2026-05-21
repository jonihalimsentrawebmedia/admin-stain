import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import UseGetSatuanOrganisasiDetail from '@/pages/modules/settings/controller/useGetSatuanOrganisasiDetail.tsx'
import { ButtonAddSectorCarrierProspect } from './component/buttonAdd.tsx'
import { UseGetListSectorStudy } from './hooks/index.tsx'
import { ColumnsSectorStudy } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const SectorCarrierProspect = () => {
  const { satuanOrganisasi } = UseGetSatuanOrganisasiDetail({
    kelompok: 'PRODI',
  })

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { sectorStudy, loading, meta } = UseGetListSectorStudy({
    page,
    limit,
    search,
  })
  const columns = ColumnsSectorStudy()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          isBack
          label={'Detail Sektor Pekerjaan'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Detail Sektor Pekerjaan'}
                  valueGuide="FAKULTAS_KOMULITAS_KULIAH_PROSPEK_KARIR_SEKTOR_PEKERJAAN"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddSectorCarrierProspect />,
            },
          ]}
        />

        <p className="text-gray-500">Program Studi</p>
        <p className={'text-2xl font-semibold text-primary'}>
          {satuanOrganisasi?.kode_jenjang} - {satuanOrganisasi?.nama}
        </p>
        <hr />

        <TableCustom data={sectorStudy} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
