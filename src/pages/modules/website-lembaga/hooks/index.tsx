import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionInstitution {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_lembaga: string
  nama_lembaga: string
  singkatan: string
}

export const UseGetInstitutionSession = () => {
  const [session, setSession] = useState<ISessionInstitution>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-institution'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
export interface ISatuanOrganisasiProfil {
  id_satuan_organisasi: string; // UUID
  id_lembaga: string;           // UUID
  /** * Field 'isi' menampung konten dalam format HTML string 
   */
  isi: string;                  
  created_at: string;           // ISO Date String
  created_user: string;
  updated_at: string;           // ISO Date String
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
}

interface Props{
  link:string,
  queryKey:string
}
export const UseGetWebsiteLembagaGlobal = ({link,queryKey}:Props) => {
  const [dataGlobal, setDataGlobal] = useState<ISatuanOrganisasiProfil>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(link).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataGlobal(data)
    }
  }, [data])

  return { dataGlobal, loading }
}
