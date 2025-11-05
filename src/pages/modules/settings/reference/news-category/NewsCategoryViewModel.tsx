
import type { ColumnDef } from "@tanstack/react-table";
import ButtonEditNewsCategory from "./components/ButtonEditNewsCategory";
import ButtonDeleteNewsCategory from "./components/ButtonDeleteNewsCategory";


const NewsCategoryViewModel = () => {
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
            <ButtonEditNewsCategory data={values}/>
           <ButtonDeleteNewsCategory/>
          </div>
        );
      },
    },
];
  return {
    columns
  }
}

export default NewsCategoryViewModel