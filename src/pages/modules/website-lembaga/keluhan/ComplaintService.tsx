import FormRichEditor from '../component/form/FormRichEditor'

const ComplaintService = () => {
  return <FormRichEditor
    linkGetData="/lembaga/keluhan"
    linkPostData="/lembaga/keluhan"
    queryKeyGetData="lembaga-keluhan"
    queryKeyPostData="lembaga-keluhan"
    title='Keluhan'
  />
}

export default ComplaintService
