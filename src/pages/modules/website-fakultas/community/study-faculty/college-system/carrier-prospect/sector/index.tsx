import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import UseGetSatuanOrganisasiDetail from '@/pages/modules/settings/controller/useGetSatuanOrganisasiDetail.tsx'
import { ButtonAddSectorCarrierProspect } from './component/buttonAdd.tsx'
import { UseGetListSectorStudy } from './hooks/index.tsx'
import { ColumnsSectorStudy } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const SectorCarrierProspect = () => {
  const { satuanOrganisasi } = UseGetSatuanOrganisasiDetail({
    kelompok: 'PRODI',
  })

  const { sectorStudy, loading, meta } = UseGetListSectorStudy()
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
