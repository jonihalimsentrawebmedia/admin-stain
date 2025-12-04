import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";


export interface User {
  id_user: string;
  email: string;
  nama_lengkap: string;
  telepon: string;
  status: "Y" | "N";     // diasumsikan status hanya Y/N
  pin_token: string;
  expired_token: number; // UNIX timestamp
  interaksi_terakhir: string; // ISO datetime
  created_at: string;         // ISO datetime
  created_user: string;
  updated_at: string;         // ISO datetime
  updated_user: string;
}


export const UseGetUserProfile = () => {
  const [profileUser, setProfileUser] = useState<User>()
  
  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['profile-user'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/auth/profile').then(res => res.data.data?.user)
  })
  
  const loading = isLoading || isFetching;
  
  useEffect(() => {
    if (data) {
      setProfileUser(data)
    }
  }, [data])
  
  return {profileUser, loading}
  
}