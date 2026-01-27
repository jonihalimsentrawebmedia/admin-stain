import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetSatuanOrganisasiDetail from "../../controller/useGetSatuanOrganisasiDetail";

const ProdiDetailViewModel = () => {
  const { satuanOrganisasi } = useGetSatuanOrganisasiDetail({
    kelompok: "PRODI",
  });
  const form = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const fieldImage = [
    {
      label: "Logo",
      name: "logo",
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img className="max-w-40 max-h-40" src={form.watch("logo")} alt="logo" />
        </div>
      ),
    },
    {
      label: "Favicon",
      name: "favicon",
      component: (
        <div className="bg-[#F5FFFA] w-fit border border-[#70F2B1] p-4">
          <img className="max-w-[60px] max-h-[60px]" src={form.watch("favicon")} alt="logo" />
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
      label: "Universitas Asal",
      name: "nama_parent",
    },
    {
      label: "Fakultas Asal",
      name: "nama_fakultas",
    },
    {
      label: "Nama Program Studi",
      name: "nama",
    },
    {
      label: "Jenjang Pendidikan",
      name: "jenjang_pendidikan",
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
      name: "kelurahan",
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
    navigate(`/modules/editor/prodi/edit/${id}`);
  }
  useEffect(() => {
    if (satuanOrganisasi) {
      form.reset({
        ...satuanOrganisasi,
      });
    }
  }, [satuanOrganisasi]);
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

export default ProdiDetailViewModel;
