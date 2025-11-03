import ButtonDelete from "@/components/common/button/ButtonDelete";
import { IconDetail, IconEdit } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

const UnitViewModel = () => {
  const navigate = useNavigate();
  const columns: ColumnDef<any>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => <span>{row.row.index + 1}</span>, // Menggunakan index baris + 1
    },

    // Kolom ID
    { accessorKey: "id", header: "ID" },

    // Kolom ID Parent
    { accessorKey: "id_parent", header: "ID Parent" },

    // Kolom Nama Unit
    { accessorKey: "nama_unit", header: "Nama Unit" },

    // Kolom Aksi (Icon Biru, Kuning, Merah)
    {
      accessorKey: "aksi",
      header: "", // Kolom aksi di gambar tidak memiliki header teks
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            {/* Tombol Biru (Asumsi: Detail/Lihat) */}
            <Link
              to={"/modules/settings/unit/detail/1"}
              onClick={() => console.log("detail", values.id)}
            >
              <IconDetail />
            </Link>
            {/* Tombol Kuning (Asumsi: Edit) */}
            <Link
              to={"/modules/settings/unit/edit/1"}
              onClick={() => console.log("edit", values.id)}
            >
              <IconEdit />
            </Link>
            {/* Tombol Merah (Asumsi: Delete) */}
            <ButtonDelete
              description={
                <p>
                  Anda akan menghapus unit “Pusat Penjamina n Mutu (P2M)”.
                  Apakah Anda yakin untuk menghapus unit yang dipilih?
                </p>
              }
              title="Hapus Data Unit?"
            />
          </div>
        );
      },
    },
  ];
  function goToAdd() {
    navigate("/modules/settings/prodi/add");
  }
  return {
    columns,
    goToAdd,
  };
};

export default UnitViewModel;
