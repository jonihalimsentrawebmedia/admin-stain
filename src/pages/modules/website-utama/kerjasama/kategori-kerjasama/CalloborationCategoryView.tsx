import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalloborationCategoryViewModel from './CalloborationCategoryViewModel'
import ButtonAddCalloborationCategory from './components/ButtonAddCalloborationCategory'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetCalloborationCategory from './controller/useGetCalloborationCategory'

const CalloborationCategoryView = () => {
  const { columns } = CalloborationCategoryViewModel()

  const { calloborationCategory, loading, meta } = useGetCalloborationCategory()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddCalloborationCategory />,
          },
        ]}
        label="Kategori Kerjasama"
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
        data={calloborationCategory}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default CalloborationCategoryView
