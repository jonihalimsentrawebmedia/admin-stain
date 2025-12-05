import { useForm } from "react-hook-form";
import { LevelUserResolver, type LeveluserType } from "../model/leveluser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

interface Props{
    id_user:string
}
const usePostLevelUser = ({id_user}:Props) => {
      const [open, setOpen] = useState(false);
   const form = useForm<LeveluserType>({
    resolver: zodResolver(LevelUserResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(data: LeveluserType) {
    setLoading(true);
    try {
      const res = await AxiosClient.post(`/pengaturan/manajemen-user/users/multi-level`, {
        ...data,
        id_user:id_user,
        list_unit:[data.list_unit]
      });

      if (res.data.status) {
        toast.success(res.data.message);
      
        await queryClient.invalidateQueries({
          queryKey: ["users-list"],
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
    handleSave,setOpen,open,loading,form
  }
}

export default usePostLevelUser