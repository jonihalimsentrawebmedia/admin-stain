import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { Button } from "@/components/ui/button";
import { Trash, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DetailField from "@/components/common/field/DetailField";
import { useQueryClient } from "@tanstack/react-query";

import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
import type { UserList } from "../model";
interface Props {
  data: UserList;
}
const ButtonDeleteUser = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/manajemen-user/users/${data.id_user}`
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["users-list"],
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  const form = useForm();
  const fieldsConfig = [
    {
      name: "nama_lengkap",
      label: "Nama User",
    },
    {
      name: "level_users",
      label: "Level",
      component: (
        <ul className="pl-4 ml-4 list-outside list-disc">
          {data.level_users.map((row) => (
            <li key={row + data.id_user}>{row}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "telepon",
      label: "No. HP",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "status",
      label: "Status",
      component: <div>{data.status == "Y" ? "Aktif" : "Tidak Aktif"}</div>,
    },
    {
      name: "aktif_sejak",
      label: "Aktif Sejak",
      component: (
        <div className="flex gap-2">
          <div>
            {data?.aktif_sejak.split(" ")[0].split("-").reverse().join("-")}
          </div>
          <div>{data?.aktif_sejak.split(" ")[1]}</div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
          form.reset({
            ...data,
          });
        }}
        className="flex gap-4 items-center text-[#464646] cursor-pointer"
      >
        <Trash className="text-red-500 size-4" />
        Hapus
      </div>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus User</p>}
      >
        <p>
          Anda akan menghapus user berikut. Apakah Anda yakin untuk melanjutkan?
        </p>
        <div className="my-4 ">
          <DetailField data={fieldsConfig} form={form} isRow={false} />
        </div>

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonDeleteUser;
