import FormRichEditor from "@/pages/modules/website-lembaga/component/form/FormRichEditor"

const ShortDescriptionView = () => {
  return (
    <FormRichEditor
      linkGetData="/unit-ppid/gambaran-singkat"
      linkPostData="/unit-ppid/gambaran-singkat"
      queryKeyGetData="ppid-gambaran-singkat"
      queryKeyPostData="ppid-gambaran-singkat"
      title="Gambaran Singkat Pembentukan"
    />
  )
}

export default ShortDescriptionView
