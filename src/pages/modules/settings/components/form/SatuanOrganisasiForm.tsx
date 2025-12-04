import CardInput from "@/components/common/card/CardInput";
import InputImage from "@/components/common/form/InputImage";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import useGetSatuanOrganisasi from "../../controller/useGetSatuanOrganisasi";
import { useEffect } from "react";

interface Props {
  form: UseFormReturn<any>;
  kelompok: string;
}
const SatuanOrganisasiForm = ({ form, kelompok }: Props) => {
  const { satuanOrganisasi } = useGetSatuanOrganisasi({
    kelompok: kelompok == "PRODI" ? "FAKULTAS" : "UNIVERSITAS",
  });

  useEffect(() => {
    if (kelompok) {
      form.setValue("kelompok", kelompok);
    }
  }, [kelompok]);

  const labelName =
    kelompok == "PRODI"
      ? "Nama Program Studi"
      : kelompok == "UNIT"
      ? "Nama Unit"
      : "Nama Universitas / Perguruan Tinggi";
  const placeHolderName =
    kelompok == "PRODI"
      ? "Nama Program Studi"
      : kelompok == "UNIT"
      ? "Nama Unit"
      : "Nama Universitas / Perguruan Tinggi";
  const placeHolderNameUniv =
    kelompok == "PRODI" ? "Pilih" : "Pilih Universitas/PT Asal";
  const labelNameUniv =
    kelompok == "PRODI" ? "Fakultas Asal" : "Universitas/PT Asal";

  function getTitle() {
    switch (kelompok) {
      case "PRODI":
        return "Identitas Program Studi";
      case "UNIT":
        return "Identitas Unit ";
      case "FAKULTAS":
        return "Identitas Fakultas";
      case "UNIVERSITAS":
        return "Identitas Institusi";
      case "LEMBAGA":
        return "Identitas Lembaga";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <InputImage form={form} name="logo" label="Logo" />
        <InputImage form={form} name="favicon" label="Favicon" />
      </div>
      <CardInput title={getTitle()}>
        {kelompok !== "UNIVERSITAS" && (
          <SelectCustom
            data={satuanOrganisasi.map((item) => {
              return {
                label: item.nama,
                value: item.id_satuan_organisasi,
              };
            })}
            name="parent_id"
            label={labelNameUniv}
            placeholder={placeHolderNameUniv}
            form={form}
            isRow
            level1
          />
        )}

        <InputText
          name="kelompok"
          label="Kelompok"
          placeholder="Pilih Kelompok"
          form={form}
          isRow
          isDisabled
        />
        <InputText
          form={form}
          name="nama"
          isRow
          label={labelName}
          placeholder={placeHolderName}
        />
        {kelompok !== "PRODI" && kelompok !== "UNIT" && (
          <InputText
            form={form}
            name="singkatan"
            isRow
            label="Singkatan "
            placeholder="Singkatan Nama Universitas / Perguruan Tinggi"
          />
        )}
        <InputText
          form={form}
          name="keyword"
          isRow
          label="Keyword"
          placeholder="Gunakan tanda koma (,) untuk memisahkan keyword"
        />
      </CardInput>
      <CardInput title="Alamat Lengkap">
        <div className="flex items-center gap-3">
          <Checkbox id="isSome" />
          <Label htmlFor="isSome" className="text-neutral font-normal">
            Gunakan alamat universitas sebagai alamat fakultas
          </Label>
        </div>
        <InputText
          form={form}
          name="alamat"
          isRow
          label="Alamat"
          placeholder="Alamat lengkap Nama Universitas / Perguruan Tinggi"
        />
        <InputText
          name="provinsi"
          label="Provinsi"
          placeholder="Masukkan Provinsi"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          name="kabupaten_kota"
          label="Kabupaten/Kota"
          placeholder="Masukkan Kabupaten/Kota"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          name="kecamatan"
          label="Kecamatan"
          placeholder="Masukkan Kecamatan"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />

        <InputText
          name="kelurahan"
          label="Kelurahan / Desa"
          placeholder="Masukkan Kelurahan / Desa"
          form={form}
          isRow
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="kode_pos"
          isRow
          label="Kode Pos"
          placeholder="Kode Pos"
          type="number"
          inputClassName="lg:max-w-[300px]"
        />
      </CardInput>
      <CardInput title="Kontak Resmi">
        <InputText
          form={form}
          name="telepon"
          isRow
          label="Telepon"
          placeholder="Telepon"
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="fax"
          isRow
          label="Fax "
          placeholder="Fax"
          inputClassName="lg:max-w-[300px]"
        />
        <InputText
          form={form}
          name="email"
          isRow
          label="Email"
          placeholder="email"
          inputClassName="lg:max-w-[300px]"
        />
      </CardInput>
      <CardInput title="Media Sosial">
        <InputText
          form={form}
          name="facebook"
          isRow
          label="Facebook"
          placeholder="Masukkan link disini"
          //   inputClassName="lg:max-w-[300px]"
        />

        <InputText
          form={form}
          name="twitter"
          isRow
          label="Twitter"
          placeholder="Masukkan link disini"
        />
        <InputText
          form={form}
          name="instagram"
          isRow
          label="Instagram"
          placeholder="Masukkan link disini"
        />
        <InputText
          form={form}
          name="youtube"
          isRow
          label="Youtube"
          placeholder="Masukkan link disini"
        />
      </CardInput>
    </>
  );
};

export default SatuanOrganisasiForm;
