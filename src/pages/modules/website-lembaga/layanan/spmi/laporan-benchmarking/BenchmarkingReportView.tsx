import FormRichEditor from "../../../component/form/FormRichEditor"


const BenchmarkingReportView = () => {
  return(
    <FormRichEditor
      linkGetData="/lembaga/laporan-benchmarking"
      linkPostData="/lembaga/laporan-benchmarking"
      queryKeyGetData="lembaga-/laporan-benchmarking"
      queryKeyPostData="lembaga-/laporan-benchmarking"
      title="Laporan Benchmarking"
      valueGuide="P2M_JAMINAN_SPMI_LAPORAN_BENCHMARKING"
    />
  )
}

export default BenchmarkingReportView
