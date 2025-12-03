import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { LevelUserResolver, type LevelUserType } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
import useGetLevelUserId from "../controller/useGetLevelUserId";

const LevelEditViewModel = () => {
  const param = useParams();
  const { id } = param;
  const { levelUser } = useGetLevelUserId();
  const navigate = useNavigate();
  const form = useForm<LevelUserType>({
    resolver: zodResolver(LevelUserResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(data: LevelUserType) {
    setLoading(true);
    try {
      const res = await AxiosClient.put(
        `/pengaturan/manajemen-user/level-users/${id}`,
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
        err?.response?.data?.error || "Terjadi kesalahan, silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  function goToBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (levelUser) {
      form.reset({
        ...levelUser,
      });
    }
  }, [levelUser]);
  return {
    form,
    loading,
    handleSave,
    navigate,
    goToBack,
  };
};

export default LevelEditViewModel;
