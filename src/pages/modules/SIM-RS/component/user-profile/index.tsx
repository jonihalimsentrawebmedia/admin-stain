import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IUserProfile {
  id_user: string
  id_satuan_organisasi: string
  nama_lengkap: string
  email: string
  telepon: string
  id_role: string
  is_status: boolean
  tanggal_registrasi: string
  registrasi_user: string
  pin_token: string
  pin_token_exp: number
  expired_token: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nama_role: string
  nama_registrasi: string
  gambar?: string
  jabatan?: string
  jenis_kelamin?: string
}

export const UseGetUserSIMRSProfile = () => {
  const { data, isLoading, isFetching } = useQuery<IUserProfile>({
    queryKey: ['user-SIM-RS'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/auth/profile').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profile: data, loading }
}
