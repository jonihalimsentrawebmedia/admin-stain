import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import useGetReportsService from "./controller/useGetReportsService"
import ReportServiceViewModel from "./ReportsServiceViewModel"
import ButtonAdd from "./components/ButtonAdd"
import TableCustom from "@/components/common/table/TableCustom"

const ReportsServiceView = () => {
   const { columns } = ReportServiceViewModel()
  const { reports, loading, meta } = useGetReportsService({})
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
        label="Laporan Layanan Informasi Publik"
      />
      <TableCustom
        isShowFilter={false}
        columns={columns}
        data={reports}
        loading={loading}
        isShowLimit={false}
        meta={meta}
        isShowPagination={false}
      />
    </div>
  )
}

export default ReportsServiceView