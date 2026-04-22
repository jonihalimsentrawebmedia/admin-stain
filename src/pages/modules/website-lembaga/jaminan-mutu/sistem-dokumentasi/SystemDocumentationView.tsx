import FormRichEditor from '../../component/form/FormRichEditor'

const SystemDocumentationView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/sistem-dokumentasi"
      linkPostData="/lembaga/sistem-dokumentasi"
      queryKeyGetData="lembaga-sistem-dokumentasi"
      queryKeyPostData="lembaga-sistem-dokumentasi"
      title='Sistem Dokumentasi'
      valueGuide='P2M_JAMINAN_SISTEM_DOKUMENTASI'
    />
  )
}

export default SystemDocumentationView
