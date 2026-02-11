import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LandingPageViewModel from './LandingPageViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'

const LandingPageView = () => {
  const { columns } = LandingPageViewModel()

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
        label="Pengaturan Warna"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={[]}
        loading={false}
        isShowLimit={false}
        isShowPagination={false}
      />
    </div>
  )
}

export default LandingPageView
