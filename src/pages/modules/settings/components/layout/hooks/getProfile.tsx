import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import Cookies from 'js-cookie'
import type { IUserProfile } from '@/pages/modules/website-utama/user-profile/data/types.ts'

export const UseGetUserProfile = () => {
  const { data, isLoading, isFetching } = useQuery<IUserProfile>({
    queryKey: ['profile-user'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/auth/profile').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      Cookies.set('profile', data.nama_lengkap)
      Cookies.set('is_admin', String(data.is_administrator))
    }
  }, [data])

  return { profileUser: data, loading }
}
