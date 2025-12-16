import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DetailField from "@/components/common/field/DetailField";
import { useQueryClient } from "@tanstack/react-query";
import type { ModuleList } from "../model";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props {
  data: ModuleList;
}
const ButtonDeleteModule = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/modules/${data.id_module}`
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["modules-list"],
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
      name: "nama_modul",
      label: "Nama Modul",
    },
    {
      name: "controller",
      label: "Controller",
    },
    {
      name: "kategori",
      label: "Kategori",
    },
    {
      name: "urutan",
      label: "Urutan",
    },
  ];
  useEffect(() => {
    form.reset({
      nama_modul: data.nama_module,
      controller: data.controller,
      kategori: data.kategori,
      urutan: data.urutan.toString(),
    });
  }, []);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        {" "}
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Modul?</p>}
      >
        <p>Apakah anda yakin untuk menghapus modul yang dipilih?</p>
        <div className="my-4 ">
          <div className="mx-auto max-w-[200px] mb-4 bg-[#F5FFFA] border border-primary rounded-xl p-4 flex justify-center items-center">
            <img src={data.gambar} alt="" />
          </div>
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

export default ButtonDeleteModule;
