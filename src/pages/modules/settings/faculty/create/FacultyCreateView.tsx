import FacultyCreateViewModel from "./FacultyCreateViewModel";
import { Form } from "@/components/ui/form";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import FacultyForm from "../components/FacultyForm";
import ButtonForm from "@/components/common/button/ButtonForm";

const FacultyCreateView = () => {
  const { form, handleSave, loading, goToBack } = FacultyCreateViewModel();
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
            label="Tambah Data Fakultas"
          />
          <FacultyForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default FacultyCreateView;
