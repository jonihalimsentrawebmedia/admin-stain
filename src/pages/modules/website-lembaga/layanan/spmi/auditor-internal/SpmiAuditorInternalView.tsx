import FormRichEditor from '../../../component/form/FormRichEditor'

const SpmiAuditorInternalView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/auditor-internal"
      linkPostData="/lembaga/auditor-internal"
      queryKeyGetData="lembaga-/auditor-internal"
      queryKeyPostData="lembaga-/auditor-internal"
      title="Auditor Internal"
    />
  )
}

export default SpmiAuditorInternalView
