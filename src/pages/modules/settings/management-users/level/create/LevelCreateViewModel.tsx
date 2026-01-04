import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LevelUserResolver, type LevelUserType } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

const LevelCreateViewModel = () => {
  const navigate = useNavigate();
  const form = useForm<LevelUserType>({
    resolver: zodResolver(LevelUserResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(data: LevelUserType) {
    setLoading(true);
    try {
      const res = await AxiosClient.post(
        `/pengaturan/manajemen-user/level-users`,
        data
      );

      if (res.data.status) {
        toast.success(res.data.message);

        await queryClient.invalidateQueries({
          queryKey: ["settings-level-users"],
        });
        goToBack();
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  function goToBack() {
    navigate(-1);
  }
  return {
    form,
    loading,
    handleSave,
    navigate,
    goToBack,
  };
};

export default LevelCreateViewModel;
