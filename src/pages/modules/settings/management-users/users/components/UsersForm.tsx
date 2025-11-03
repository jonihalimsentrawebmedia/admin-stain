import CardInput from "@/components/common/card/CardInput";
import { InputCheckbox } from "@/components/common/form/InputCheckbox";
import InputImage from "@/components/common/form/InputImage";
import { InputRadio } from "@/components/common/form/InputRadio";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import type { UseFormReturn } from "react-hook-form";
import { optionSatuan } from "../data";

interface Props {
  form: UseFormReturn<any>;
}
const UsersForm = ({ form }: Props) => {
  return (
    <>
      <div className="max-w-[250px]">
        <InputImage form={form} name="logo" label="Logo" />
      </div>
      <CardInput title="Informasi User">
        <div className="flex flex-col gap-4">
          <InputText
            form={form}
            name="nama_lengkap"
            isRow
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            isRequired
          />
          <InputText
            form={form}
            name="jabatan"
            isRow
            label="Jabatan"
            placeholder="Jabatan"
            isRequired
          />
          <InputRadio
            form={form}
            isRow
            name="jenis_kelamin"
            label="Jenis Kelamin"
            data={[
              {
                label: "Laki-Laki",
                value: "Laki-Laki",
              },
              {
                label: "Perempuan",
                value: "Perempuan",
              },
            ]}
          />
          <InputText
            form={form}
            name="nomor_telepon"
            isRow
            label="Telepon"
            placeholder="Telepon"
            type="number"
            inputClassName="lg:max-w-[300px]"
          />
          <InputText
            form={form}
            name="email"
            isRow
            label="Email"
            placeholder="Email"
            type="email"
            inputClassName="lg:max-w-[300px]"
          />
          <InputRadio
            isRow
            form={form}
            name="status_akun"
            label="Status Akun"
            data={[
              {
                label: "Aktif",
                value: "Aktif",
              },
              {
                label: "Tidak Aktif",
                value: "Tidak Aktif",
              },
            ]}
          />
          <SelectCustom
            data={[]}
            name="level_user"
            label="Level User"
            placeholder="Masukkan Level User"
            form={form}
            isRow
            level5
            inputClassName="lg:max-w-[300px]"
          />
          <InputRadio
            isRow
            form={form}
            name="ada_satuan_kerja"
            label="Ada Satuan Kerja?"
            data={[
              {
                label: "Ya",
                value: "Ya",
              },
              {
                label: "Tidak",
                value: "Tidak",
              },
            ]}
          />
          {form.watch("ada_satuan_kerja") == "Ya" ? (
            <InputCheckbox
              isRow
              form={form}
              name="satuan_kerja"
              label="Pilih Satuan Kerja"
              data={optionSatuan}
              isSingle
              isGrid
            />
          ) : (
            <InputText
              form={form}
              name="satuan_kerja"
              label="Pilih Satuan Kerja"
              defaultValue="Tidak Ada Satker"
              placeholder="Tidak Ada Satker"
              isRow
              
              isDisabled
              inputClassName="lg:max-w-[300px]"
            />
          )}
        </div>
      </CardInput>
    </>
  );
};

export default UsersForm;
