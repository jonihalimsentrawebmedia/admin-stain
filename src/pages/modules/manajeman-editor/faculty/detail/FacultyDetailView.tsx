import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import FacultyDetailViewModel from "./FacultyDetailViewModel";
import DetailField from "@/components/common/field/DetailField";
import CardInput from "@/components/common/card/CardInput";

const FacultyDetailView = () => {
  const {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  } = FacultyDetailViewModel();
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
        label="Detail Data Fakultas"
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
        <CardInput title="Identitas Fakultas">
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

export default FacultyDetailView;
