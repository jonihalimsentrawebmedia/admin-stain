import FormRichEditor from '../../../component/form/FormRichEditor'

const SpmiReviewerView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/reviewer"
      linkPostData="/lembaga/reviewer"
      queryKeyGetData="lembaga-/reviewer"
      queryKeyPostData="lembaga-/reviewer"
      title="Reviewer"
      valueGuide='P2M_JAMINAN_SPMI_REVIEWER'
    />
  )
}

export default SpmiReviewerView
