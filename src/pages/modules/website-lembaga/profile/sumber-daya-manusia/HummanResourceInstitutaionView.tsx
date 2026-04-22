import FormRichEditor from '../../component/form/FormRichEditor'

const HummanResourceInstitutaionView = () => {
  return (
    <FormRichEditor
      linkGetData="/lembaga/sumber-daya-manusia"
      linkPostData="/lembaga/sumber-daya-manusia"
      queryKeyGetData="lembaga-sumber-daya-manusia"
      queryKeyPostData="lembaga-sumber-daya-manusia"
      title="Sumber Daya Manusia"
      valueGuide="P2M_TENTANG_SUMBER_DAYA_MANUSIA"
    />
  )
}

export default HummanResourceInstitutaionView
