import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import useGetReportsSurvey from "./controller/useGetReportsSurvey"
import ReportSurveyViewModel from "./ReportsSurveyViewModel"
import ButtonAdd from "./components/ButtonAdd"
import TableCustom from "@/components/common/table/TableCustom"
import ButtonGoToGuide from "@/pages/modules/website-utama/panduan/components/ButtonGoToGuide"

const ReportsSurveyView = () => {
   const { columns } = ReportSurveyViewModel()
  const { reports, loading, meta } = useGetReportsSurvey({})
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
           {
            type: 'custom',
            element: (
              <ButtonGoToGuide
                titleGuide={'Laporan Survei Layanan Informasi Publik'}
                valueGuide="PPID_LAPORAN_SURVEI_LAYANAN_INFORMASI_PUBLIK"
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
        label="Laporan Survei Layanan Informasi Publik"
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