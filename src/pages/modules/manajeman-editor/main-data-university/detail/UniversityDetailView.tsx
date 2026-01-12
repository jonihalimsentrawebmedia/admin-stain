import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import DetailField from "@/components/common/field/DetailField";
import CardInput from "@/components/common/card/CardInput";
import UniversityDetailViewModel from "./UniversityDetailViewModel";

const UniversityDetailView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  } = UniversityDetailViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={[
          {
            label: "Edit Data",
            onClick: () => {
              goToEdit();
            },
            type: "edit",
          },
        ]}
        label="Detail Data Universitas"
      />
      <div className="flex flex-col gap-4">
        <div>
          <DetailField
            data={fieldImage}
            form={form}
            isRowParent
            isRow={false}
          />
        </div>
        <CardInput title="Identitas Unit">
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
  );
};

export default UniversityDetailView;
