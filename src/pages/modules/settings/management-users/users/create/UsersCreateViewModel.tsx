import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UsersResolver, type UsersType } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

const UsersCreateViewModel = () => {
  const navigate = useNavigate();

  const form = useForm<UsersType>({
    resolver: zodResolver(UsersResolver),
  });

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  async function handleSave(data: UsersType) {
    setLoading(true);
    try {
      const res = await AxiosClient.post(`/pengaturan/manajemen-user/users`, {
        ...data,
      });

      if (res.data.status) {
        toast.success(res.data.message);
        goToBack();
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

export default UsersCreateViewModel;
