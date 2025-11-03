import { Form } from "@/components/ui/form";

import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UsersForm from "../components/UsersForm";
import ButtonForm from "@/components/common/button/ButtonForm";
import UsersCreateViewModel from "./UsersCreateViewModel";


const UsersCreateView = () => {
   const { form, handleSave, loading, goToBack } = UsersCreateViewModel();
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
            label="Tambah Data User"
          />
          <UsersForm form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
}

export default UsersCreateView