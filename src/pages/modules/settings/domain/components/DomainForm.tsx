
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}
const DomainForm = ({ form }: Props) => {
  return (
    <>
      <SelectCustom
        data={[]}
        name="jenis_module"
        label="Jenis Modul"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />
      <SelectCustom
        data={[]}
        name="kelompok"
        label="Kelompok"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />
      <SelectCustom
        data={[]}
        name="nama"
        label="Nama"
        placeholder="Pilih"
        form={form}
        isRow
        level1
      />

      <InputText
        form={form}
        name="domain"
        isRow
        label="Domain   "
        placeholder="Domain "
      />
      <InputText
        form={form}
        name="ip_server"
        isRow
        label="IP Server"
        placeholder="IP Server"
      />
      <InputText
        form={form}
        name="endpoint_be"
        isRow
        label="Endpoint BE"
        placeholder="Endpoint BE"
      />
    </>
  );
};

export default DomainForm;
