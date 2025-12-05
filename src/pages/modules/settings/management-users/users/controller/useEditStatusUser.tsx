import AxiosClient from "@/provider/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
    status: "Y" | "N"
}
const useEditStatusUser = ({ status }: Props) => {
    const params = useParams()
    const { id } = params
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    async function handleUpdate() {
        setLoading(true);
        try {
            const res = await AxiosClient.patch(`/pengaturan/manajemen-user/users/${id}/status`, {
                status: status
            });

            if (res.data.status) {
                toast.success(res.data.message);

                await queryClient.invalidateQueries({
                    queryKey: ["users-list"],
                });
                navigate(-1)
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
        handleUpdate, setOpen, open, loading,
    }
}

export default useEditStatusUser