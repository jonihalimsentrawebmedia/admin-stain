import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalloborationListViewModel from './CalloborationListViewModel'
import useGetCalloborationList from './controller/useGetCalloborationList'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import ButtonGoToGuide from '../../panduan/components/ButtonGoToGuide'

const CalloborationListView = () => {
  const { columns, goToAdd } = CalloborationListViewModel()
  const { calloborationList, loading, meta } = useGetCalloborationList()
  
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
            {
            type: 'custom',
            element: <ButtonGoToGuide titleGuide='Daftar Kerjasama' valueGuide="WEBSITE_UTAMA_KERJASAMA" />,
          },
          {
            label: 'Tambah Daftar Kerjasama',
            onClick: goToAdd,
            type: 'add',
          },
        ]}
        label="Daftar Kerjasama"
      />
      <TableCustom
        addFilter={
          <SelectFilter
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
        data={calloborationList}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default CalloborationListView
