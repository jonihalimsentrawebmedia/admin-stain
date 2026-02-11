import FormRichEditor from '../../component/form/FormRichEditor'

const SystemDocumentationView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/sistem-dokumentasi"
      linkPostData="/lembaga/sistem-dokumentasi"
      queryKeyGetData="lembaga-sistem-dokumentasi"
      queryKeyPostData="lembaga-sistem-dokumentasi"
      title='Sistem Dokumentasi'
    />
  )
}

export default SystemDocumentationView
