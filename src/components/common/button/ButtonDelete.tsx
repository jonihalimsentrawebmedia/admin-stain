import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import AxiosClient from "@/provider/axios";
import { useQueryClient } from "@tanstack/react-query";
import {  Trash2Icon, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";

interface Props {
  title: string;
  description: ReactNode;
  urlDelete?: string;
  queryKey?: string;
}
const ButtonDelete = ({ description, title, urlDelete, queryKey }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(urlDelete ?? "");

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Terjadi kesalahan, silakan coba lagi."
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
          console.log(urlDelete);
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
        title={<p className="text-2xl text-red-500">{title}</p>}
      >
        {description}

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
            <Trash2Icon />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  );
};

export default ButtonDelete;
