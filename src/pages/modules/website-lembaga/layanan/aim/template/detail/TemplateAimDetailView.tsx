import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import TemplateAimDetailViewModel from './TemplateAimDetailViewModel'
import useGetTemplateAimDetail from '../comtroller/useGetTemplateAimDetail'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const TemplateAimDetailView = () => {
  const { columns } = TemplateAimDetailViewModel()
  const { document, loading, meta, title } = useGetTemplateAimDetail({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonGoToGuide titleGuide={title} valueGuide="P2M_JAMINAN_AIM_TEMPLATE_DOKUMEN" />
            ),
          },
          {
            label: '',
            onClick: () => {},
            type: 'add',
            element: <ButtonAdd />,
          },
        ]}
        label={title}
        isBack
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

export default TemplateAimDetailView
