import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditDomain from "./components/ButtonEditDomain";
import ButtonDeleteDomain from "./components/ButtonDeleteDomain";

const DomainViewModel = () => {
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

    // ✅ Jenis Modul
    { accessorKey: "jenis_modul", header: "Jenis Modul" },

    // ✅ Kelompok
    { accessorKey: "kelompok", header: "Kelompok" },

    // ✅ Nama
    { accessorKey: "nama", header: "Nama" },

    // ✅ Domain
    { accessorKey: "domain", header: "Domain" },

    // ✅ IP Server
    { accessorKey: "ip_server", header: "IP Server" },

    // ✅ Endpoint BE
    { accessorKey: "endpoint_be", header: "Endpoint BE" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: () => {
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditDomain />
            <ButtonDeleteDomain />
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default DomainViewModel;
