import CardInput from "@/components/common/card/CardInput";
import DetailField from "@/components/common/field/DetailField";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}
const MainDataUniversityDetail = ({ form }: Props) => {
  const fieldImage = [
    {
      label: "Logo",
      name: "logo",
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img src={form.watch("logo")} alt="logo" />
        </div>
      ),
    },
    {
      label: "Favicon",
      name: "favicon",
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img src={form.watch("favicon")} alt="logo" />
        </div>
      ),
    },
  ];
  const fieldUniversity = [
    {
      label: "Kelompok",
      name: "kelompok",
    },
    {
      label: "Nama Universitas / Perguruan Tinggi",
      name: "nama_universitas_perguruan_tinggi",
    },
    {
      label: "Singkatan",
      name: "singkatan",
    },
    {
      label: "Keyword",
      name: "keyword",
    },
  ];
  const fieldAddress = [
    {
      label: "Alamat",
      name: "alamat",
    },
    {
      label: "Provinsi",
      name: "provinsi",
    },
    {
      label: "Kabupaten/Kota",
      name: "kabupaten_kota",
    },
    {
      label: "Kecamatan",
      name: "kecamatan",
    },
    {
      label: "Kelurahan / Desa",
      name: "kelurahan_desa",
    },
    {
      label: "Kode Pos",
      name: "kode_pos",
    },
  ];
  const fieldContact = [
    {
      label: "Telepon",
      name: "telepon",
    },
    {
      label: "Fax",
      name: "fax",
    },
    {
      label: "Email",
      name: "email",
    },
  ];
  const fieldMediaSocial = [
    {
      label: "Facebook",
      name: "facebook",
    },
    {
      label: "Twitter",
      name: "twitter",
    },
    {
      label: "Instagram",
      name: "instagram",
    },
    {
      label: "Youtube",
      name: "youtube",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <DetailField data={fieldImage} form={form} isRowParent isRow={false}/>
      </div>
      <CardInput title="Identitas Institusi">
        <DetailField data={fieldUniversity} form={form} />
      </CardInput>
      <CardInput title="Alamat Lengkap">
        <DetailField data={fieldAddress} form={form} />
      </CardInput>
      <CardInput title="Kontak Resmi">
        <DetailField data={fieldContact} form={form} />
      </CardInput>
      <CardInput title="Media Sosial">
        <DetailField data={fieldMediaSocial} form={form} />
      </CardInput>
    </div>
  );
};

export default MainDataUniversityDetail;
