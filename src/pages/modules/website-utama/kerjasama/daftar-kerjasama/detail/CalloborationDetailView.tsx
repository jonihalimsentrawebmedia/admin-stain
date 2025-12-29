import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import CalloborationDetailViewModel from './CalloborationDetailViewModel'
import CardInput from '@/components/common/card/CardInput'
import DetailField from '@/components/common/field/DetailField'

const CalloborationDetailView = () => {
  const { fieldExpired, fieldIdentitas, fieldLegalitas, fieldSubtansi, fieldUnit, form, goToEdit } =
    CalloborationDetailViewModel()
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'edit',
            label: 'Edit Data',
            onClick: goToEdit,
          },
        ]}
        label="Detail Kerjasama"
        isBack
      />

      <CardInput title="Unit Yang Melakukan Kerjasama">
        <DetailField data={fieldUnit} form={form} />
      </CardInput>
      <CardInput title="Identitas Mitra">
        <DetailField data={fieldIdentitas} form={form} isGrid />
      </CardInput>
      <CardInput title="Legalitas  & Klasifikasi">
        <DetailField data={fieldLegalitas} form={form} isGrid />
      </CardInput>
      <CardInput title="Masa Berlaku">
        <DetailField data={fieldExpired} form={form} isGrid />
      </CardInput>
      <CardInput title="Substansi & Manfaat">
        <DetailField data={fieldSubtansi} form={form} />
      </CardInput>
    </div>
  )
}

export default CalloborationDetailView
