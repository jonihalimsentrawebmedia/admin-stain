import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditModule from "./components/ButtonEditModule";
import ButtonDeleteModule from "./components/ButtonDeleteModule";

const ModuleViewModel = () => {
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

    // ✅ Icon
    {
      accessorKey: "icon",
      header: "Icon",
      cell: (row) => {
        const values = row.row.original;
        // Asumsi nilai 'icon' adalah string yang bisa digunakan sebagai prop atau nama ikon
        // Di sini saya asumsikan IconGear adalah komponen yang digunakan (sesuai gambar)
        return <img src={values} alt="" width={40} height={40} />;
      },
    },

    // ✅ Nama Modul
    { accessorKey: "nama_modul", header: "Nama Modul" },

    // ✅ Controller
    { accessorKey: "controller", header: "Controller" },

    // ✅ Kategori
    { accessorKey: "kategori", header: "Kategori" },

    // ✅ Urutan
    { accessorKey: "urutan", header: "Urutan" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: () => {
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditModule />
            <ButtonDeleteModule />
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default ModuleViewModel;
