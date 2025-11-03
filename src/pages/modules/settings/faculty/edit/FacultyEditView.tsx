import FacultyEditViewModel from "./FacultyEditViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import FacultyForm from "../components/FacultyForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import { Form } from "@/components/ui/form";

const FacultyEditView = () => {
  const { form, handleSave, loading, goToBack } = FacultyEditViewModel();
  return (
    <div className="flex flex-col">
      <Form {...form} >
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
            label="Edit Data Fakultas"
          />
          <FacultyForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default FacultyEditView;
