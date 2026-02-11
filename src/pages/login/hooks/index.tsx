import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";

export interface Institution {
  nama: string;
  logo: string;
  background: string;
}


export const UseGetIdentityPublic = () => {
  const [publicIdentity, setPublicIdentity] = useState<Institution>()

  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['public-identity'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/identitas').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setPublicIdentity(data)
    }
  }, [data])

  return {publicIdentity, loading}

}