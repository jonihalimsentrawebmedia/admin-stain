import { Form } from "@/components/ui/form";
import InstitutionEditViewModel from "./InstitutionEditViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import InstitutionForm from "../components/InstitutionForm";
import ButtonForm from "@/components/common/button/ButtonForm";

const InstitutionEditView = () => {
  const { form, handleSave, loading, goToBack } = InstitutionEditViewModel();
  return (
    <div className="flex flex-col gap-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="flex flex-col gap-4"
        >
          <ButtonTitleGroup
            buttonGroup={[
              {
                label: "Batal",
                onClick: () => {
                  goToBack();
                },
                type: "cancel",
              },
              {
                type: "save",
                label: "Simpan",
                onClick: () => {},
              },
            ]}
            label="Edit Lembaga"
          />
          <InstitutionForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default InstitutionEditView;
