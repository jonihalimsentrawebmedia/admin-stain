import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DetailField from "@/components/common/field/DetailField";
import type { DomainList } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

interface Props {
  data: DomainList;
}
const ButtonDeleteDomain = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const fieldsConfig = [
    {
      name: "kelompok",
      label: "Kelompok",
    },
    {
      name: "nama_satuan_organisasi",
      label: "Nama",
    },
    {
      name: "domain",
      label: "Domain",
    },
    {
      name: "ip",
      label: "IP Server",
    },
    {
      name: "endpoint_be",
      label: "Endpoint BE",
    },
  ];

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/domains/${data.id_domain}`
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-domain"],
        });
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
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          form.reset({
            ...data,
          });
        }}
      >
        {" "}
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={
          <p className="text-2xl text-red-500">
            Hapus Pengaturan Domain Public
          </p>
        }
      >
        <p>Apakah anda yakin untuk menghapus domain yang dipilih?</p>
        <div className="my-4 ">
          <DetailField data={fieldsConfig} form={form} />
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
            onClick={handleDelete}
            disabled={loading}
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

export default ButtonDeleteDomain;
