import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetTypeOfCalloboration from './controller/useGetTypeOfCalloboration'
import TypeOfCalloborationViewModel from './TypeOfCalloborationViewModel'
import ButtonAddTypeOfCalloboration from './components/ButtonAddTypeOfCalloboration'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const TypeOfCalloborationView = () => {
  const { columns } = TypeOfCalloborationViewModel()

  const { typeOfCalloboration, loading, meta } = useGetTypeOfCalloboration()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddTypeOfCalloboration />,
          },
        ]}
        label="Jenis Kerjasama"
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
        data={typeOfCalloboration}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default TypeOfCalloborationView
