import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import useGetReportsSurvey from "./controller/useGetReportsSurvey"
import ReportSurveyViewModel from "./ReportsSurveyViewModel"
import ButtonAdd from "./components/ButtonAdd"
import TableCustom from "@/components/common/table/TableCustom"

const ReportsSurveyView = () => {
   const { columns } = ReportSurveyViewModel()
  const { reports, loading, meta } = useGetReportsSurvey({})
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

export default ReportsSurveyView