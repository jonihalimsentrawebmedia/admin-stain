import { DialogCustom } from "@/components/common/dialog/DialogCustom";
import { IconDelete } from "@/components/common/table/icon";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import type { AcademicRankList } from "../model";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props {
  data: AcademicRankList;
}
const ButtonDeleteAcademicRank = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/referensi/pangkat-akademik/${data.id_akademik}`
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-academic-rank"],
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
        className="cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconDelete />
      </button>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Pangkat Akademik</p>}
      >
        <p>
          Anda akan menghapus Pangkat Akademik{" "}
          <span className="font-bold">“${data.nama_akademik}”</span>. Apakah
          Anda yakin untuk menghapus Pangkat Akademik yang dipilih?
        </p>

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

export default ButtonDeleteAcademicRank;
