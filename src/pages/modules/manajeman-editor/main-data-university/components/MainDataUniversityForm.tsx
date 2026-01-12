import ButtonForm from "@/components/common/button/ButtonForm";
import CardInput from "@/components/common/card/CardInput";
import InputImage from "@/components/common/form/InputImage";
import { InputText } from "@/components/common/form/InputText";
import { SelectCustom } from "@/components/common/form/SelectCustom";
import { Form } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
  handleSave: (values: any) => void;
  loading: boolean;
}
const MainDataUniversityForm = ({ form, handleSave, loading }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <InputImage form={form} name="logo" label="Logo" />
          <InputImage form={form} name="favicon" label="Favicon" />
        </div>
        <CardInput title="Identitas Institusi">
          <SelectCustom
            data={[]}
            name="kelompok"
            label="Kelompok"
            placeholder="Pilih Kelompok"
            form={form}
            isRow
            level1
          />
          <InputText
            form={form}
            name=""
            isRow
            label="Nama Universitas / Perguruan Tinggi"
            placeholder="Nama Universitas / Perguruan Tinggi"
          />
          <InputText
            form={form}
            name="singkatan"
            isRow
            label="Singkatan "
            placeholder="Singkatan Nama Universitas / Perguruan Tinggi"
          />
          <InputText
            form={form}
            name="keyword"
            isRow
            label="Keyword"
            placeholder="Gunakan tanda koma (,) untuk memisahkan keyword"
          />
        </CardInput>
        <CardInput title="Alamat Lengkap">
          <InputText
            form={form}
            name=""
            isRow
            label="Alamat"
            placeholder="Alamat lengkap Nama Universitas / Perguruan Tinggi"
          />
          <SelectCustom
            data={[]}
            name="provinsi"
            label="Provinsi"
            placeholder="Masukkan Provinsi"
            form={form}
            isRow
            level1
            inputClassName="lg:max-w-[300px]"
          />
          <SelectCustom
            data={[]}
            name="kabupaten"
            label="Kabupaten/Kota"
            placeholder="Masukkan Kabupaten/Kota"
            form={form}
            isRow
            level2
            inputClassName="lg:max-w-[300px]"
          />
          <SelectCustom
            data={[]}
            name="provinsi"
            label="Provinsi"
            placeholder="Masukkan Provinsi"
            form={form}
            isRow
            level3
            inputClassName="lg:max-w-[300px]"
          />
          <SelectCustom
            data={[]}
            name="kecamatan"
            label="Kecamatan"
            placeholder="Masukkan Kecamatan"
            form={form}
            isRow
            level4
            inputClassName="lg:max-w-[300px]"
          />
          <SelectCustom
            data={[]}
            name="kelurahan"
            label="Kelurahan / Desa"
            placeholder="Masukkan Kelurahan / Desa"
            form={form}
            isRow
            level5
            inputClassName="lg:max-w-[300px]"
          />
          <InputText
            form={form}
            name=""
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
            inputClassName="lg:max-w-[300px]"
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
            name="Youtube"
            isRow
            label="Youtube"
            placeholder="Masukkan link disini"
          />
        </CardInput>
        <ButtonForm loading={loading} />
      </form>
    </Form>
  );
};

export default MainDataUniversityForm;
