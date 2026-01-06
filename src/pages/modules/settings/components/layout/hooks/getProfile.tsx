import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import Cookies from 'js-cookie'
import type { IUserProfile } from '@/pages/modules/website-utama/user-profile/data/types.ts'

export const UseGetUserProfile = () => {
  const [profileUser, setProfileUser] = useState<IUserProfile>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['profile-user'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/auth/profile').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfileUser(data)
      Cookies.set('profile', data.nama_lengkap)
    }
  }, [data])

  return { profileUser, loading }
}
