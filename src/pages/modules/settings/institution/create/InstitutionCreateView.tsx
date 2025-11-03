import { Form } from "@/components/ui/form";
import InstitutionCreateViewModel from "./InstitutionCreateViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import InstitutionForm from "../components/InstitutionForm";
import ButtonForm from "@/components/common/button/ButtonForm";

const InstitutionCreateView = () => {
    const { form, handleSave, loading, goToBack } = InstitutionCreateViewModel();
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
            label="Tambah Lembaga"
          />
          <InstitutionForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
}

export default InstitutionCreateView