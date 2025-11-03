import { Form } from "@/components/ui/form";
import UnitCreateViewModel from "./UnitCreateViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import ButtonForm from "@/components/common/button/ButtonForm";
import UnitForm from "../components/UnitForm";

const UnitCreateView = () => {
   const { form, handleSave, loading, goToBack } = UnitCreateViewModel();
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
            label="Tambah Data Unit"
          />
          <UnitForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
}

export default UnitCreateView