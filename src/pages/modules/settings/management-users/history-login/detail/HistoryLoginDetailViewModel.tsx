import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const HistoryLoginDetailViewModel = () => {
  const form=useForm()
  const fieldsConfig = [
    {
      name: "nama_lengkap",
      label: "Nama Lengkap*",
    },
    {
      name: "jabatan",
      label: "Jabatan*",
    },
    {
      name: "level_user_1",
      label: "Level User 1",
    },
    {
      name: "level_user_2",
      label: "Level User 2",
    },
  ];
  const columns: ColumnDef<any>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => {
        // Menggunakan index + 1 untuk nomor urut
        return <div>{row.row.index + 1}</div>;
      },
    },

    // ✅ Satuan Kerja
    { accessorKey: "satuan_kerja", header: "Satuan Kerja" },

    // ✅ Menu
    { accessorKey: "menu", header: "Menu" },

    // ✅ Waktu (Tanggal dan Jam dalam dua baris)
    {
      accessorKey: "waktu",
      header: "Waktu",
      cell: (row) => {
        const value = row.row.original.waktu;
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return <div className="whitespace-pre-line">{value}</div>;
      },
    },

    // ✅ Aksi (Teks Deskripsi Aksi)
    { accessorKey: "aksi", header: "Aksi" },
  ];

  useEffect(()=>{
    form.reset({
      nama_lengkap: "Rudi Tabuti",
  jabatan: "Kaprodi",
  level_user_1: "Admin Fakultas",
  level_user_2: "Editor Website",
    })
  },[])
  return {
    columns,fieldsConfig,form
  };
};

export default HistoryLoginDetailViewModel;
