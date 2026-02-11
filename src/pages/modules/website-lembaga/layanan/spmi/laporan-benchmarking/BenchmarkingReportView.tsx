import FormRichEditor from "../../../component/form/FormRichEditor"


const BenchmarkingReportView = () => {
  return(
    <FormRichEditor
      linkGetData="/lembaga/laporan-benchmarking"
      linkPostData="/lembaga/laporan-benchmarking"
      queryKeyGetData="lembaga-/laporan-benchmarking"
      queryKeyPostData="lembaga-/laporan-benchmarking"
      title="Laporan Benchmarking"
    />
  )
}

export default BenchmarkingReportView
