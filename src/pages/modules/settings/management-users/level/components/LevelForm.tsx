import { InputRadio } from "@/components/common/form/InputRadio";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}
const LevelForm = ({ form }: Props) => {
  const options = [
    {
      label: "Ya",
      value: true,
    },
    {
      label: "Tidak",
      value: false,
    },
  ];
  const isSuperAdmin = form.watch("is_superadmin");
  const isSatker = form.watch("is_satker");

  useEffect(() => {
    if (isSuperAdmin) {
      form.setValue("is_satker", undefined);
      form.setValue("kelompok", undefined);
    }
  }, [isSuperAdmin]);
  useEffect(() => {
    if (isSatker) {
      form.setValue("kelompok", undefined);
    }
  }, [isSatker]);
  return (
    <div className="flex flex-col gap-4">
      <InputText
        form={form}
        name="nama"
        isRow
        label="Nama Level User"
        placeholder="Nama Level User"
      />
      <InputRadio
        label="Super Admin?"
        isRow
        data={options}
        form={form}
        name="is_superadmin"
      />
      <InputRadio
        isDisabled={
          form.watch("is_superadmin") == true ||
          form.watch("is_superadmin") == undefined
        }
        label="Ada Satker?"
        isRow
        data={options}
        form={form}
        name="is_satker"
      />
      <SelectCustom
        data={[
          {
            value: "SATUAN_KERJA",
            label: "Satuan Kerja",
          },
          {
            value: "EDITOR",
            label: "Editor",
          },
        ]}
        name="kelompok"
        label="Kelompok"
        placeholder="Pilih Kelompok"
        form={form}
        isRow
        level1
        isDisabled={
          form.watch("is_superadmin") == true ||
          form.watch("is_superadmin") == undefined ||
          form.watch("is_satker") == false ||
          form.watch("is_satker") == undefined
        }
        className="disabled:bg-gray-200!"
        inputClassName="lg:max-w-[300px] disabled:bg-gray-200!"
      />
    </div>
  );
};

export default LevelForm;
