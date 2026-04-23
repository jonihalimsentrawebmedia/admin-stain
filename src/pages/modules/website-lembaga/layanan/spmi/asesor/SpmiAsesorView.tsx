
import FormRichEditor from "../../../component/form/FormRichEditor"


const SpmiAsesorView = () => {
 return(
   <FormRichEditor
      linkGetData="/lembaga/asesor"
      linkPostData="/lembaga/asesor"
      queryKeyGetData="lembaga-/asesor"
      queryKeyPostData="lembaga-/asesor"
      title="Asesor"
      valueGuide="P2M_JAMINAN_SPMI_ASESOR"
    />
 )
}

export default SpmiAsesorView