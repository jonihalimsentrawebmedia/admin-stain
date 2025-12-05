import { useState } from "react";
import { useForm } from "react-hook-form";
import { LevelUserResolver, type LeveluserType } from "../model/leveluser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";
interface Props {
    id_level_user: string
    id_multi_level: string
}
const useEditLevelUser = ({ id_level_user, id_multi_level }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm<LeveluserType>({
        resolver: zodResolver(LevelUserResolver),
    });

    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    async function handleSave(data: LeveluserType) {
        setLoading(true);
        try {
            const res = await AxiosClient.put(`/pengaturan/manajemen-user/users/multi-level/${id_multi_level}`, {
                ...data,
                id_level_user,
                list_unit: [data.list_unit]
            });

            if (res.data.status) {
                toast.success(res.data.message);

                await queryClient.invalidateQueries({
                    queryKey: ["users-list"],
                });
                setOpen(false)
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
            );
        } finally {
            setLoading(false);
        }
    }
    return {
        handleSave, setOpen, open, loading, form
    }
}

export default useEditLevelUser