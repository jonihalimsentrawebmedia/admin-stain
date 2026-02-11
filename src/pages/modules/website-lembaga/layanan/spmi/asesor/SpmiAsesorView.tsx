
import FormRichEditor from "../../../component/form/FormRichEditor"


const SpmiAsesorView = () => {
 return(
   <FormRichEditor
      linkGetData="/lembaga/asesor"
      linkPostData="/lembaga/asesor"
      queryKeyGetData="lembaga-/asesor"
      queryKeyPostData="lembaga-/asesor"
      title="Asesor"
    />
 )
}

export default SpmiAsesorView