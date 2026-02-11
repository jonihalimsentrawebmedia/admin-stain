import FormRichEditor from '../../../component/form/FormRichEditor'

const SpmiReviewerView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/reviewer"
      linkPostData="/lembaga/reviewer"
      queryKeyGetData="lembaga-/reviewer"
      queryKeyPostData="lembaga-/reviewer"
      title="Reviewer"
    />
  )
}

export default SpmiReviewerView
