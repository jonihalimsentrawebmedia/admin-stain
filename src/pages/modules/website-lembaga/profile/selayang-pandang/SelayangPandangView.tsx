import FormRichEditor from '../../component/form/FormRichEditor'

const SelayangPandangView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/profil-lembaga"
      linkPostData="/lembaga/profil-lembaga"
      queryKeyGetData="lembaga-profil-lembaga"
      queryKeyPostData="lembaga-profil-lembaga"
      title="Selayang Pandang"
    />
  )
}

export default SelayangPandangView
