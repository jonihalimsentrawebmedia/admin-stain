import { IconDetail } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const HistoryLoginViewModel = () => {
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

    // ✅ Nama User
    { accessorKey: "nama_user", header: "Nama User" },

    // ✅ Level
    { accessorKey: "level", header: "Level" },

    // ✅ No. Handphone
    { accessorKey: "no_handphone", header: "No. Handphone" },

    // ✅ Aktif Sejak
    {
      accessorKey: "aktif_sejak",
      header: "Aktif Sejak",
      cell: (row) => {
        const value = row.row.original.aktif_sejak;
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return <div className="whitespace-pre-line">{value}</div>;
      },
    },

    // ✅ Login Terakhir
    {
      accessorKey: "login_terakhir",
      header: "Login Terakhir",
      cell: (row) => {
        const value = row.row.original.login_terakhir;
        // Memastikan tampilan tanggal dan waktu dalam dua baris
        return <div className="whitespace-pre-line">{value}</div>;
      },
    },

    // ✅ Aktivitas (Ikon Panah)
    {
      accessorKey: "aktivitas",
      header: "Aktivitas",
      cell: (row) => {
        const values = row.row.original;
        // Ikon panah ke kanan, biasanya untuk melihat detail
        return (
          <Link
            to={`/modules/settings/management-users/history/detail/1`}
            onClick={() => console.log("Lihat Aktivitas", values.id)}
          >
            {/* Asumsi IconArrowRight adalah komponen yang merepresentasikan ikon panah ke kanan */}
            <IconDetail />
          </Link>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default HistoryLoginViewModel;
