import { IconDelete, IconEdit } from '@/components/common/table/icon';
import type { ColumnDef } from '@tanstack/react-table';

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
            <button onClick={() => console.log("edit", values.id)}>
              {/* Asumsi IconEdit adalah ikon pensil/edit berwarna kuning */}
              <IconEdit />
            </button>
            <button onClick={() => console.log("delete", values.id)}>
              {/* Asumsi IconDelete adalah ikon tong sampah/hapus berwarna merah */}
              <IconDelete  />
            </button>
          </div>
        );
      },
    },
];
  return {
    columns
  }
}

export default GroupRankViewModel