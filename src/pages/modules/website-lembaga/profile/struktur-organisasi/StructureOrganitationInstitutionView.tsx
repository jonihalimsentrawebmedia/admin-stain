import FormRichEditor from '../../component/form/FormRichEditor'

const StructureOrganitationInstitutionView = () => {
   return (
    <FormRichEditor
      linkGetData="/lembaga/struktur-organisasi"
      linkPostData="/lembaga/struktur-organisasi"
      queryKeyGetData="lembaga-struktur-organisasi"
      queryKeyPostData="lembaga-struktur-organisasi"
      title="Struktur Organisasi"
    />
  )
}

export default StructureOrganitationInstitutionView