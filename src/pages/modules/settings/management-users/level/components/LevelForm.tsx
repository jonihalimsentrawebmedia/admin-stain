import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}
const LevelForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <InputText
        form={form}
        name="nama_level"
        isRow
        label="Nama Level User"
        placeholder="Nama Level User"
      />
      <SelectCustom
        data={[]}
        name="kelompok"
        label="Kelompok"
        placeholder="Pilih Kelompok"
        form={form}
        isRow
        level1
        inputClassName="lg:max-w-[300px]"
      />
    </div>
  );
};

export default LevelForm;
