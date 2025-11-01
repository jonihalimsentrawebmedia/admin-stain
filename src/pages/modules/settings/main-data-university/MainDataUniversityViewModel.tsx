import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LOGO from '@/assets/img/logo.png'
const MainDataUniversityViewModel = () => {
  const [isDetail, setIsDetail] = useState(true);
  const form = useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
 
  async function handleSave(values: any) {
    setLoadingSubmit(false);
    setLoadingSubmit(true);

    console.log(values);
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
      logo:LOGO,
      favicon:LOGO
    });
  }, []);
  return {
    form,
    handleSave,
    loadingSubmit,
    isDetail,
    setIsDetail,
  };
};

export default MainDataUniversityViewModel;
