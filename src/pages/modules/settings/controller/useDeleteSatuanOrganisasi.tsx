import AxiosClient from "@/provider/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
interface Props {
  kelompok?: string;
  id: string;
}
const useDeleteSatuanOrganisasi = ({ kelompok, id }: Props) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleDelete() {
    setLoading(true);
    try {
      const res = await AxiosClient.delete(
        `/pengaturan/satuan-organisasi/${kelompok ?? ""}/${id}`
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["satuan-organisasi-list"],
        });
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }
  return{
    handleDelete,loading
  }
};

export default useDeleteSatuanOrganisasi;
