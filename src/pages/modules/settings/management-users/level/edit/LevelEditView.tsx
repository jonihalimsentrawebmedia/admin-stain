import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import LevelEditViewModel from "./LevelEditViewModel";
import LevelForm from "../components/LevelForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import { Form } from "@/components/ui/form";

const LevelEditView = () => {
  const { form, goToBack, handleSave, loading } = LevelEditViewModel();
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
            label="Edit Level User"
          />
          <LevelForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default LevelEditView;
