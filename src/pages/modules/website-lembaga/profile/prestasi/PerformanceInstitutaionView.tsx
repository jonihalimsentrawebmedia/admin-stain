import FormRichEditor from "../../component/form/FormRichEditor"


const PerformanceInstitutaionView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/prestasi"
      linkPostData="/lembaga/prestasi"
      queryKeyGetData="lembaga-prestasi"
      queryKeyPostData="lembaga-prestasi"
      title="Prestasi"
    />
  )
}

export default PerformanceInstitutaionView