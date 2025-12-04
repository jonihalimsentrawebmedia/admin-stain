import { Form } from "@/components/ui/form";
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import ButtonForm from "@/components/common/button/ButtonForm";
import SatuanOrganisasiForm from "../../components/form/SatuanOrganisasiForm";
import usePostSatuanOrganisasi from "../../controller/usePostSatuanOrganisasi";

const UniversityCreateView = () => {
  const { form, handleSave, loading, goToBack } = usePostSatuanOrganisasi({
    kelompok: "UNIVERSITAS",
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
            label="Tambah Data Universitas"
          />
          <SatuanOrganisasiForm kelompok="UNIVERSITAS" form={form} />
          <ButtonForm loading={loading} />
        </form>
      </Form>
    </div>
  );
};

export default UniversityCreateView;
