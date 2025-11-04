import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import DetailField from "@/components/common/field/DetailField";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonEditLevelUser from "./ButtonEditLevelUser";
import TableCustom from "@/components/common/table/TableCustom";
import { dummyDataLevelUser } from "../data";

const ButtonSettingLevelUser = () => {
  const form = useForm();
  const [open, setOpen] = useState(false);

  const field = [
    {
      label: "Jabatan",
      name: "jabatan",
    },
    {
      label: "Level User 1",
      name: "level_user",
    },
  ];
  const columns: ColumnDef<any>[] = [
    // ✅ Nomor (Menggunakan index dari row)
    {
      accessorKey: "no",
      header: "#",
      cell: (row) => {
        // Menggunakan index + 1 untuk nomor urut
        return <div>{row.row.index + 1}</div>;
      },
    },

    // ✅ Level
    { accessorKey: "level", header: "Level" },

    // ✅ Satuan Kerja
    {
      accessorKey: "satuan_kerja",
      header: "Satuan Kerja",
      cell: (row) => {
        const satuanKerjaList: string[] = row.row.original.satuan_kerja;

        if (Array.isArray(satuanKerjaList)) {
          // Menampilkan daftar satuan kerja dalam bentuk list
          return (
            <ul className="list-disc list-inside ml-2">
              {satuanKerjaList.map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        // Jika bukan array, tampilkan langsung nilainya (seperti di baris 1)
        return <div>{satuanKerjaList}</div>;
      },
    },

    // ✅ Status (Menggunakan switch/toggle dari gambar)
    {
      accessorKey: "status",
      header: "Status",
      cell: (row) => {
        const values = row.row.original;
        const isActive = values.status === "Aktif";

        // Menggunakan Switch/Toggle dan teks Status
        return (
          <div className="flex flex-col items-center">
            {/* Asumsi Anda memiliki komponen Switch atau Toggle */}
            {/* Jika tidak ada, bisa diganti dengan ikon atau badge */}
            <Switch
              checked={isActive}
              // Contoh penanganan perubahan status
              onCheckedChange={() =>
                console.log("Status changed for ID:", values.id)
              }
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
            />
            <div
              className={`text-sm ${
                isActive ? "text-green-600" : "text-gray-600"
              }`}
            >
              {values.status}
            </div>
          </div>
        );
      },
    },

    // ✅ Aktif Sejak
    { accessorKey: "aktif_sejak", header: "Aktif Sejak" },

    // ✅ Diubah
    { accessorKey: "diubah", header: "Diubah" },

    // ✅ Aksi (Ikon Edit)
    {
      accessorKey: "action",
      header: "Aksi",
      cell: () => {
        return <ButtonEditLevelUser />;
      },
    },
  ];

  useEffect(() => {
    form.reset({
      level_user: "Kaprodi",
      jabatan: "Admin Fakultas",
    });
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center space-x-4 cursor-pointer "
      >
        <Pencil className="text-orange-400 size-4" />
        <div className="text-[#464646]">Atur Level User</div>
      </div>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Atur Level User</p>}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 border-primary border rounded-xl bg-[#F5FFFA]">
            <DetailField data={field} form={form} isRow />
          </div>
          <TableCustom
            isShowPagination={false}
            isShowFilter={false}
            columns={columns}
            data={dummyDataLevelUser}
            placeHolderSearch="Cari  User"
          />
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonSettingLevelUser;
