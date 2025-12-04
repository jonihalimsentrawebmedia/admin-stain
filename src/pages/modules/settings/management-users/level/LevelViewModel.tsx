import ButtonDelete from "@/components/common/button/ButtonDelete";
import { IconEdit } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { LevelUserList } from "./model";

const LevelViewModel = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const navigate = useNavigate();
  function goToAdd() {
    navigate(`/modules/settings/management-users/level/add`);
  }

  const columns: ColumnDef<LevelUserList>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => {
        const idx = row.row.index;
        return <div className="">{(page - 1) * limit + idx + 1}</div>;
      }, // Menggunakan index baris + 1
    },

    // Kolom Nama Level
    { accessorKey: "nama", header: "Nama Level" },
    {
      accessorKey: "is_satker",
      header: "Wajib Ada Satker?",
      cell: (row) => {
        const values = row.row.original;
        return <div className="">{values.is_satker ? "Ya" : "Tidak"}</div>;
      },
    },
    { accessorKey: "kelompok", header: "Kelompok" },

    // Kolom Aksi (Icon Kuning dan Merah)
    {
      accessorKey: "aksi",
      header: "", // Kolom aksi di gambar tidak memiliki header teks
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex gap-2 items-center">
            {/* Tombol Kuning (Asumsi: Edit/Pensil) */}
            <Link
              to={`/modules/settings/management-users/level/edit/${values.id_level}`}
            >
              <IconEdit />
            </Link>
            {/* Tombol Merah (Asumsi: Delete/Sampah) */}
            <ButtonDelete
              queryKey="settings-level-users"
              urlDelete={`/pengaturan/manajemen-user/level-users/${values.id_level}`}
              title="Hapus Data Level?"
              description={
                <p>
                  Anda akan menghapus level user “{values.nama}”. Apakah Anda
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
