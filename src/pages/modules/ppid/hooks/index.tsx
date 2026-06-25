import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionPPID {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_unit: string
  nama_unit: string
  singkatan: string
  domain: string
}

export const UseGetPPIDSession = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-ppid'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit-ppid/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
export interface ISatuanOrganisasiProfil {
  id_satuan_organisasi: string // UUID
  id_lembaga: string // UUID
  /** * Field 'isi' menampung konten dalam format HTML string
   */
  isi: string
  created_at: string // ISO Date String
  created_user: string
  updated_at: string // ISO Date String
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

interface Props {
  link: string
  queryKey: string
}
export const UseGetWebsitePPIDGlobal = ({ link, queryKey }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(link).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { dataGlobal: data, loading }
}
