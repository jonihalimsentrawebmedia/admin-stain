import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditAcademicRank from "./components/ButtonEditAcademicRank";
import ButtonDeleteAcademicRank from "./components/ButtonDeleteAcademicRank";

const AcademicRankViewModel = () => {
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

    // ✅ Nama Pangkat Akademik
    { accessorKey: "nama_pangkat_akademik", header: "Nama Pangkat Akademik" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditAcademicRank data={values} />
            <ButtonDeleteAcademicRank />
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default AcademicRankViewModel;
