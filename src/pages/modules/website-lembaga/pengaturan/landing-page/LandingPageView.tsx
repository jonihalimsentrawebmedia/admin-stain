import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LandingPageViewModel from './LandingPageViewModel'
import ButtonAdd from './components/ButtonAdd'
import TableCustom from '@/components/common/table/TableCustom'
import useGetLandingPage from './controller/useGetLandingPage'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const LandingPageView = () => {
  const { columns } = LandingPageViewModel()
  const { landing, loading, meta } = useGetLandingPage({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <ButtonGoToGuide
                titleGuide="Landing Page"
                valueGuide="P2M_PENGATURAN_LANDING_PAGE"
              />
            ),
          },
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

export default LandingPageView
