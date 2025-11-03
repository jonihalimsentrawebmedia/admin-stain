import {
 
  IconDetail,
  IconEdit,
} from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import ButtonDelete from "./components/ButtonDelete";

const FacultyViewModel = () => {
  const navigate = useNavigate();
  const columns: ColumnDef<any>[] = [
    // ✅ No (Menggunakan index dari data)
    {
      accessorKey: "no",
      header: "No",
      cell: (row) => {
        // row.row.index adalah index berbasis 0
        return row.row.index + 1;
      },
    },

    // ✅ ID
    { accessorKey: "id", header: "ID" },

    // ✅ ID Parent
    { accessorKey: "id_parent", header: "ID Parent" },

    // ✅ Nama Fakultas
    { accessorKey: "nama_fakultas", header: "Nama Fakultas" },

    // ✅ Singkatan
    { accessorKey: "singkatan", header: "Singkatan" },

    // ✅ Aksi (Icon Detail, Edit, Delete)
    {
      accessorKey: "action",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;
        console.log(values)
        // Asumsi IconDetail, IconEdit, IconDelete telah didefinisikan
        return (
          <div className="flex gap-2 items-center">
            <Link to={"/modules/settings/faculty/detail/1"}>
              {/* Mengganti IconGear dengan IconEdit sesuai gambar */}
              <IconDetail />
            </Link>
            <Link to={"/modules/settings/faculty/edit/1"}>
              <IconEdit />
            </Link>
            <ButtonDelete />
          </div>
        );
      },
    },
  ];

  function goToAdd() {
    navigate("/modules/settings/faculty/add");
  }
  return {
    columns,
    goToAdd,
  };
};

export default FacultyViewModel;
