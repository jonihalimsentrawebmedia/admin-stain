import InputImage2 from "@/components/common/form/InputImage2";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}
const ModuleForm = ({ form }: Props) => {
  return (
    <>
      <div className="max-w-[300px]">
        <InputImage2 label="" description="icon" form={form} name="logo" maxSizeMB={2} />
      </div>
      <InputText
        form={form}
        name=""
        isRow
        label="Nama Modul"
        placeholder="Nama Modul"
      />
      <InputText
        form={form}
        name=""
        isRow
        label="Controller "
        placeholder="Controller "
      />
      <SelectCustom
        data={[]}
        name="kategori"
        label="Kategori"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />
      <InputText
        form={form}
        name="urutan"
        isRow
        label="Urutan "
        placeholder="Urutan "
      />
    </>
  );
};

export default ModuleForm;
