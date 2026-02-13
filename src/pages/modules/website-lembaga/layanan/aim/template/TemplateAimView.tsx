import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonAdd from './components/ButtonAdd'

import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import TemplateAimViewModel from './TemplateAimViewModel'
import useGetTemplateAim from './comtroller/useGetTemplateAim'

const TemplateAimView = () => {
  const { columns } = TemplateAimViewModel()
  const { document, loading, meta } = useGetTemplateAim({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAdd />,
          },
        ]}
        label="Template AIM"
      />
      <TableCustom
        addFilter={
          <SelectFilter
            isLabelTop
            selectClassName={'min-w-[8rem]'}
            label="Jumlah Data"
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
        data={document}
        loading={loading}
        meta={meta}
        isShowLimit={false}
      />
    </div>
  )
}

export default TemplateAimView
