import FormRichEditor from '../../component/form/FormRichEditor'

const PublicServiceView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/pelayanan-publik"
      linkPostData="/lembaga/pelayanan-publik"
      queryKeyGetData="lembaga-pelayanan-publik"
      queryKeyPostData="lembaga-pelayanan-publik"
      title="Pelayanan Publik"
      valueGuide='P2M_LAYANAN_PUBLIK'
    />
  )
}

export default PublicServiceView
