import { Form } from "@/components/ui/form";
import ProdiCreateViewModel from "../create/ProdiCreateViewModel";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import ProdiForm from "../components/ProdiForm";
import ButtonForm from "@/components/common/button/ButtonForm";

const ProdiEditView = () => {
  const { form, handleSave, loading, goToBack } = ProdiCreateViewModel();
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
            label="Edit Data Fakultas"
          />
          <ProdiForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
}

export default ProdiEditView