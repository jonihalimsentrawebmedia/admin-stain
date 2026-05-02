import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import DomainViewModel from './DomainViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddDomain from './components/ButtonAddDomain'
import useGetDomain from './controller/useGetDomain'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

const DomainView = () => {
  const { columns } = DomainViewModel()
  const { domains, loading, meta } = useGetDomain()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Pengaturan Domain"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddDomain />,
          },
        ]}
      />
      <TableCustom
        addFilter={
          <SelectFilter
            selectClassName={'text-black lg:min-w-[200px]!'}
            label={'Kelompok'}
            options={['UNIVERSITAS', 'FAKULTAS', 'PRODI', 'UNIT', 'LEMBAGA', 'UKK_UKM'].map(
              (row) => ({
                label: row.split('_').join(' '),
                value: row,
              })
            )}
            name={'kelompok'}
          />
        }
        columns={columns}
        data={domains}
        loading={loading}
        isShowChoiceColumn={true}
        meta={meta}
        placeHolderSearch="Cari Domain"
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default DomainView
