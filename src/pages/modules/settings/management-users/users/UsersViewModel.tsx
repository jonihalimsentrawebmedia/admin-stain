import type { ColumnDef } from "@tanstack/react-table";
import { IoIosInformationCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil, Plus, Trash } from "lucide-react";
const UsersViewModel = () => {
  const navigate = useNavigate();
  const columns: ColumnDef<any>[] = [
    // Kolom # (Nomor Urut)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => <span>{row.row.index + 1}</span>, // Menggunakan index baris + 1
    },

    // Kolom Nama User
    { accessorKey: "nama_user", header: "Nama User" },

    // Kolom Level (Memiliki penanda bullet/dot untuk level kedua)
    {
      accessorKey: "level",
      header: "Level",
      cell: (row) => {
        const { level, secondary_level } = row.row.original;
        return (
          <div className="flex flex-col">
            <span>{level}</span>
            {secondary_level && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">•</span>
                <span>{secondary_level}</span>
              </div>
            )}
          </div>
        );
      },
    },

    // Kolom No. Handphone (Memiliki ikon telepon)
    {
      accessorKey: "no_handphone",
      header: "No. Handphone",
      cell: (row) => {
        const values = row.row.original;
        return (
          <div className="flex items-center gap-2">
            <FaGear className="text-green-600" />
            {/* <IconGear className="text-green-600" /> */}
            <span>{values.no_handphone}</span>
          </div>
        );
      },
    },

    // Kolom Email
    { accessorKey: "email", header: "Email" },

    // Kolom Status (Menggunakan komponen Toggle/Switch)
    {
      accessorKey: "status",
      header: "Status",
      cell: (row) => {
        const { status } = row.row.original;
        const isAktif = status === "Aktif";
        return (
          <div className="flex justify-center flex-col items-center">
            <Switch checked={isAktif} />
            <span className="text-xs text-gray-500 mt-1">
              {isAktif ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        );
      },
    },

    // Kolom Aktif Sejak (Tanggal dan Waktu)
    { accessorKey: "aktif_sejak", header: "Aktif Sejak" },

    // Kolom Aksi (Menu Ellipsis)
    {
      accessorKey: "aksi",
      header: "", // Header kosong
      cell: (row) => {
        const values = row.row.original;
        console.log(values)
        // Diwakili oleh menu dropdown/ellipsis
        return (
          <Popover>
            <PopoverTrigger>...</PopoverTrigger>
            <PopoverContent side="right">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center text-black">
                  <IoIosInformationCircle className="text-blue-500 size-4" />
                  Detail User
                </div>
                <div className="flex gap-4 items-center">
                  <Plus className="text-green-500 size-4" />
                  Tambah Level
                </div>
                <div className="flex gap-4 items-center">
                  <Pencil className="text-orange-500 size-4" />
                  Edit
                </div>
                <div className="flex gap-4 items-center">
                  <Trash className="text-red-500 size-4" />
                  Hapus
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  function goToAdd() {
    navigate(`/modules/settings/management-users/users/add`);
  }
  return {
    columns,
    goToAdd,
  };
};

export default UsersViewModel;
