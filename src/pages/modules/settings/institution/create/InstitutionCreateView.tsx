import { Form } from "@/components/ui/form";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";

import ButtonForm from "@/components/common/button/ButtonForm";
import usePostSatuanOrganisasi from "../../controller/usePostSatuanOrganisasi";
import SatuanOrganisasiForm from "../../components/form/SatuanOrganisasiForm";

const InstitutionCreateView = () => {
  const { form, handleSave, loading, goToBack } = usePostSatuanOrganisasi({
    kelompok: "LEMBAGA",
  });
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
          <SatuanOrganisasiForm kelompok="LEMBAGA" form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default InstitutionCreateView;
