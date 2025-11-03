import { Form } from "@/components/ui/form";
import UnitEditViewModel from "./UnitEditViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UnitForm from "../components/UnitForm";
import ButtonForm from "@/components/common/button/ButtonForm";

const UnitEditView = () => {
  const { form, handleSave, loading, goToBack } = UnitEditViewModel();
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
            label="Edit Data Unit"
          />
          <UnitForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
}

export default UnitEditView