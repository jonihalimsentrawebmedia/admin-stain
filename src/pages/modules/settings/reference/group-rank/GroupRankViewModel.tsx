import type { ColumnDef } from "@tanstack/react-table";
import ButtonDeleteGroupRank from "./components/ButtonDeleteGroupRank";
import ButtonEditGroupRank from "./components/ButtonEditGroupRank";

const GroupRankViewModel = () => {
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

    // ✅ Nama Pangkat Golongan
    { accessorKey: "nama_pangkat_golongan", header: "Nama Pangkat Golongan" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditGroupRank data={values} />
            <ButtonDeleteGroupRank />
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default GroupRankViewModel;
