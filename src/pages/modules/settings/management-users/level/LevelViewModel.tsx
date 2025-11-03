import ButtonDelete from "@/components/common/button/ButtonDelete";
import { IconEdit } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

const LevelViewModel = () => {
  const navigate = useNavigate();
  function goToAdd() {
    navigate(`/modules/settings/management-users/level/add`);
  }

  const columns: ColumnDef<any>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => <span>{row.row.index + 1}</span>, // Menggunakan index baris + 1
    },

    // Kolom Nama Level
    { accessorKey: "nama_level", header: "Nama Level" },

    // Kolom Aksi (Icon Kuning dan Merah)
    {
      accessorKey: "aksi",
      header: "", // Kolom aksi di gambar tidak memiliki header teks
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            {/* Tombol Kuning (Asumsi: Edit/Pensil) */}
            <Link to={`/modules/settings/management-users/level/edit/1`} onClick={() => console.log("edit", values.id)}>
              <IconEdit />
            </Link>
            {/* Tombol Merah (Asumsi: Delete/Sampah) */}
            <ButtonDelete
              title="Hapus Data Level?"
              description={
                <p>
                  Anda akan menghapus level user “Admin Fakultas”. Apakah Anda
                  yakin untuk menghapus level yang dipilih?
                </p>
              }
            />
          </div>
        );
      },
    },
  ];
  return {
    columns,
    goToAdd,
  };
};

export default LevelViewModel;
