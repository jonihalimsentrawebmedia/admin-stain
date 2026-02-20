import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LandingPageViewModel from './LandingPageViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import useGetLandingPage from './controller/useGetLandingPage'

const PPIDLandingPageView = () => {
  const { columns } = LandingPageViewModel()
const {landing,loading,meta}=useGetLandingPage({})
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
        label="Landing Page"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={landing}
        loading={loading}
        isShowLimit={false}
        meta={meta}
        isShowPagination={false}
      />
    </div>
  )
}

export default PPIDLandingPageView
