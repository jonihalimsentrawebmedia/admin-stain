import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "../model";
import AxiosClient from "@/provider/axios";


const useGetProfile = () => {
    const { data, isLoading, isFetching } = useQuery<{
        data: UserProfile;

    }>({
        refetchOnWindowFocus: false,
        queryKey: ["profile"],
        queryFn: () =>
            AxiosClient.get("/profil").then(
                (res) => res.data
            ),

    });

    const loading = isLoading || isFetching;

    return {
        profile: data?.data,
        loading,
    };
}

export default useGetProfile