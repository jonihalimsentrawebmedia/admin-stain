import { IconDetail, IconEdit } from "@/components/common/table/icon";
import type { ColumnDef } from "@tanstack/react-table";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ButtonDelete from "./components/ButtonDelete";
import type { SatuanOrganisasiList } from "../model";

const FacultyViewModel = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const navigate = useNavigate();
  const columns: ColumnDef<SatuanOrganisasiList>[] = [
    // ✅ No (Menggunakan index dari data)
    {
      accessorKey: "no",
      header: "No",
      cell: (row) => {
        const idx = row.row.index;
        return <div>{(page - 1) * limit + idx + 1}</div>;
      },
    },

    // ✅ ID
    { accessorKey: "id_satuan_organisasi", header: "ID" },

    // ✅ ID Parent
    { accessorKey: "parent_id", header: "ID Parent" },

    // ✅ Nama Fakultas
    { accessorKey: "nama", header: "Nama Fakultas" },

    // ✅ Singkatan
    { accessorKey: "singkatan", header: "Singkatan" },

    // ✅ Aksi (Icon Detail, Edit, Delete)
    {
      accessorKey: "action",
      header: "Aksi",
      cell: (row) => {
        const values = row.row.original;

        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`/modules/settings/faculty/detail/${values.id_satuan_organisasi}`}
            >
              <IconDetail />
            </Link>
            <Link
              to={`/modules/settings/faculty/edit/${values.id_satuan_organisasi}`}
            >
              <IconEdit />
            </Link>
            <ButtonDelete data={values} />
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
