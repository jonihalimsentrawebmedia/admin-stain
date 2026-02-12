import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ServiceAccreditationViewModel from './ServiceAccreditationViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import useGetServiceAccreditation from './controller/useGetServiceAccreditation'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi'

const ServiceAccreditationView = () => {
  const { columns } = ServiceAccreditationViewModel()
  const { accreditation, loading, meta } = useGetServiceAccreditation({})
  const { satuanOrganisasi: prodi } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'PRODI',
    isFilter: true,
  })
  const { satuanOrganisasi: univ } = useGetSatuanOrganisasi({
    isGetAll: true,
    kelompok: 'UNIVERSITAS',
    isFilter: true,
  })
  const options = [
    ...univ.map((item) => ({ label: item.nama, value: item.id_satuan_organisasi })),
    ...prodi.map((item) => ({ label: item.nama, value: item.id_satuan_organisasi })),
  ]
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Akreditasi" />
      <SelectFilter
        selectClassName={'min-w-[8rem] max-w-[12rem]'}
        label="Pilih Universitas / Prodi"
        name={'id_satuan_organisasi_akreditas'}
        options={options??[]}
      />
      <TableCustom
        addFilter={
          <SelectFilter
            isLabelTop
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        columns={columns}
        data={accreditation}
        loading={loading}
        isShowLimit={false}
        meta={meta}
      />
    </div>
  )
}

export default ServiceAccreditationView
