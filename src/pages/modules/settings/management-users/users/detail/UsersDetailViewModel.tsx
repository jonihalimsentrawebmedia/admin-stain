import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import PROFILE from '@/assets/img/profile.png'
const UsersDetailViewModel = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const fieldImage = [
    {
      label: "Foto",
      name: "foto",
      component: (
        <div className="bg-[#F5FFFA] max-w-[200px] ">
          <img src={form.watch("foto")} alt="logo" />
        </div>
      ),
    },
    
  ];
  const fieldConfiguration = [
    { name: "nama_lengkap", label: "Nama Lengkap" },
    { name: "jabatan", label: "Jabatan" },
    { name: "jenis_kelamin", label: "Jenis Kelamin" },
    { name: "telepon", label: "Telepon" },
    { name: "email", label: "Email" },
    { name: "level_user", label: "Level User" },
    { name: "satuan_kerja", label: "Satuan Kerja" },
  ];
  function goToEdit() {
    navigate(`/modules/settings/faculty/edit/${id}`);
  }
  useEffect(() => {
    form.reset({
      nama_lengkap: "Rudi Tabuti",
      jabatan: "Kaprodi",
      jenis_kelamin: "Laki-laki",
      telepon: "081234657890",
      email: "ruditabuti@gmail.com",
      level_user: "Editor Website",
      satuan_kerja: "P2M, Fakultas Ekonomi, Fakultas Bahasa",
      foto:PROFILE
    });
  }, []);
  return {
    fieldConfiguration,
    fieldImage,
    form,
    goToEdit,
  };
};

export default UsersDetailViewModel;
