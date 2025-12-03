import LevelCreateViewModel from "./LevelCreateViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import LevelForm from "../components/LevelForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import { Form } from "@/components/ui/form";

const LevelCreateView = () => {
  const { form, handleSave, loading, goToBack } = LevelCreateViewModel();
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
                isDisabled: loading,
              },
            ]}
            label="Tambah Level User"
          />
          <LevelForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default LevelCreateView;
