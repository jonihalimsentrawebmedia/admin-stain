import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditNewsCategory from "./components/ButtonEditNewsCategory";
import ButtonDeleteNewsCategory from "./components/ButtonDeleteNewsCategory";
import { useSearchParams } from "react-router-dom";

const NewsCategoryViewModel = () => {
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

    // ✅ Nama Kategori
    { accessorKey: "nama_kategori", header: "Nama Kategori" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditNewsCategory data={values} />
            <ButtonDeleteNewsCategory data={values} />
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default NewsCategoryViewModel;
