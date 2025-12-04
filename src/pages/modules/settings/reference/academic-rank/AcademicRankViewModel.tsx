import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditAcademicRank from "./components/ButtonEditAcademicRank";
import ButtonDeleteAcademicRank from "./components/ButtonDeleteAcademicRank";
import { useSearchParams } from "react-router-dom";

const AcademicRankViewModel = () => {
   const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const columns: ColumnDef<any>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => {
        const idx = row.row.index;
        return <div className="">{(page - 1) * limit + idx + 1}</div>;
      },
    },

    // ✅ Nama Pangkat Akademik
    { accessorKey: "nama_akademik", header: "Nama Pangkat Akademik" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditAcademicRank data={values} />
            <ButtonDeleteAcademicRank data={values} />
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
