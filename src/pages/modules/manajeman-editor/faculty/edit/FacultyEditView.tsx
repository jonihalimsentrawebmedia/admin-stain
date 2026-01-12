
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";

import ButtonForm from "@/components/common/button/ButtonForm";
import { Form } from "@/components/ui/form";
import useUpdateSatuanOrganisasi from "../../controller/useUpdateSatuanOrganisasi";
import SatuanOrganisasiForm from "@/pages/modules/settings/components/form/SatuanOrganisasiForm";

const FacultyEditView = () => {
  // const { form, handleSave, loading, goToBack } = FacultyEditViewModel();

  const { form, handleSave, loading, goToBack } = useUpdateSatuanOrganisasi({
    kelompok: "FAKULTAS",
  });
  return (
    <div className="flex flex-col">
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
          <SatuanOrganisasiForm form={form} kelompok="FAKULTAS" />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default FacultyEditView;
