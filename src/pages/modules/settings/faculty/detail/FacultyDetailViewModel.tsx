import { useForm } from "react-hook-form";

import LOGO from "@/assets/img/logo.png";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const FacultyDetailViewModel = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
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

  function goToEdit() {
    navigate(`/modules/settings/faculty/edit/${id}`);
  }
  useEffect(() => {
    form.reset({
      kelompok: "Universitas",
      nama_universitas_perguruan_tinggi:
        "Sekolah Tinggi Agama Islam Negeri Mandailing Natal",
      singkatan: "STAIN MADINA",
      keyword: "STAIN MADINA, Sumatera Utara, Perguruan Tinggi",
      telepon: "081234657890",
      fax: "0123456789",
      email: "stainmadina@email.ac.id",
      alamat: "Jl. Prof. Dr. Andi Hakim, No. 9.",
      provinsi: "Sumatera Utara",
      kabupaten_kota: "Kabupaten Mandailing Natal",
      kecamatan: "Panjabungan",
      kelurahan_desa: "Desa Janji",
      kode_pos: "12345",
      logo: LOGO,
      favicon: LOGO,
    });
  }, []);
  return {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,
    goToEdit,
  };
};

export default FacultyDetailViewModel;
