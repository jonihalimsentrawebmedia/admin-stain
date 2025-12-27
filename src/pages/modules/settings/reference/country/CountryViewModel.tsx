import type { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import type { CountryList } from "./model";
import ButtonEditCountry from "./components/ButtonEditCountry";
import ButtonDeleteCountry from "./components/ButtonDeleteCountry";

const CountryViewModel = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const columns: ColumnDef<CountryList>[] = [
    // ✅ Nomor (#)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => {
        const idx = row.row.index;
        return <div>{(page - 1) * limit + idx + 1}</div>;
      },
    },

    // ✅ Nama Pangkat Golongan
    { accessorKey: "nama_negara", header: "Nama Negara" },

    // ✅ Aksi (Ikon Edit dan Hapus)
    {
      accessorKey: "aksi",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditCountry data={values} />
            <ButtonDeleteCountry data={values}/>
          </div>
        );
      },
    },
  ];
  return {
    columns,
  };
}

export default CountryViewModel