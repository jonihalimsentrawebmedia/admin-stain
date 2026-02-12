import FormRichEditor from "../../component/form/FormRichEditor"

const WorkProgramInstitutaionView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/program-kerja"
      linkPostData="/lembaga/program-kerja"
      queryKeyGetData="lembaga-program-kerja"
      queryKeyPostData="lembaga-program-kerja"
      title="Program Kerja"
    />
  )
}

export default WorkProgramInstitutaionView