import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import LembagaViewModel from './LembagaViewModel'
import DetailField from '@/components/common/field/DetailField'
import CardInput from '@/components/common/card/CardInput'
import ButtonCancelDraft from './components/ButtonCancelDraft'

const LembagaView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  } = LembagaViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={
          form.watch('status_publish') == 'DRAFT'
            ? [
                {
                  type: 'custom',
                  element: <ButtonCancelDraft />,
                },
              ]
            : [
                {
                  label: 'Edit Data',
                  onClick: () => {
                    goToEdit()
                  },
                  type: 'edit',
                },
              ]
        }
        label="Data Lembaga"
      />
      <div className="flex flex-col gap-4">
        <div>
          <DetailField data={fieldImage} form={form} isRowParent isRow={false} />
        </div>
        <CardInput title="Identitas Lembaga">
          <DetailField data={fieldUniversity} form={form} />
        </CardInput>
        <CardInput title="Alamat Lengkap">
          <DetailField data={fieldAddress} form={form} />
        </CardInput>
        <CardInput title="Kontak Resmi">
          <DetailField data={fieldContact} form={form} />
        </CardInput>
        <CardInput title="Media Sosial">
          <DetailField data={fieldMediaSocial} form={form} />
        </CardInput>
      </div>
    </div>
  )
}

export default LembagaView
