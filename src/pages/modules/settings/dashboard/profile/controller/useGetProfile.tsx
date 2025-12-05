import { useEffect, useState } from "react";
import type { UserProfile } from "../model";
import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";


const useGetProfile = () => {
    const [profile, setProfile] = useState<UserProfile>();

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

    useEffect(() => {
        if (data) {
            setProfile(data.data);
        }
    }, [data]);

    return {
        profile,
        loading,
    };
}

export default useGetProfile