import FormRichEditor from '../../component/form/FormRichEditor'

const ManagementReviewView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/tinjauan-manajemen"
      linkPostData="/lembaga/tinjauan-manajemen"
      queryKeyGetData="lembaga-tinjauan-manajemen"
      queryKeyPostData="lembaga-tinjauan-manajemen"
      title='Tinjauan Manajemen'
    />
  )
}

export default ManagementReviewView
