import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetInfoGraphics from './controller/useGetInfoGraphics'
import InfographicsViewModel from './InfographicsViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'

const InfographicsView = () => {
  const { columns } = InfographicsViewModel()
  const { infographics, loading, meta } = useGetInfoGraphics({})
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
        label="Infografis"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={infographics}
        loading={loading}
        isShowLimit={false}
        meta={meta}
        isShowPagination={false}
      />
    </div>
  )
}

export default InfographicsView
