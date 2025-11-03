import ButtonDelete from "@/components/common/button/ButtonDelete";
import { IconDetail, IconEdit } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

const InstitutionViewModel = () => {
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

    // Kolom Nama Lembaga
    { accessorKey: "nama_lembaga", header: "Nama Lembaga" },

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
              to={`/modules/settings/institution/detail/1`}
              onClick={() => console.log("detail", values.id)}
            >
              <IconDetail />
            </Link>
            {/* Tombol Kuning (Asumsi: Edit) */}
            <Link
              to={`/modules/settings/institution/edit/1`}
              onClick={() => console.log("edit", values.id)}
            >
              <IconEdit />
            </Link>
            {/* Tombol Merah (Asumsi: Delete) */}
            <ButtonDelete
              title="Hapus Data Lembaga?"
              description={
                <p>
                  Anda akan menghapus lembaga “Pusat Penelitian dan Pengabdian
                  Masyarakat (P3M)”. Apakah Anda yakin untuk menghapus lembaga
                  yang dipilih?
                </p>
              }
            />
          </div>
        );
      },
    },
  ];
  function goToAdd(){
    navigate(`/modules/settings/institution/add`)
  }
  return {
    goToAdd,columns
  }
};

export default InstitutionViewModel;
