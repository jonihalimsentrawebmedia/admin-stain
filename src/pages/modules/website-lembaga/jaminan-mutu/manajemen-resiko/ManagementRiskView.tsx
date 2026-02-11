import FormRichEditor from '../../component/form/FormRichEditor'

const ManagementRiskView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/manajemen-resiko"
      linkPostData="/lembaga/manajemen-resiko"
      queryKeyGetData="lembaga-manajemen-resiko"
      queryKeyPostData="lembaga-manajemen-resiko"
      title='Manajemen Resiko'
    />
  )
}

export default ManagementRiskView
