import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import type { UserDetail } from '../model'

interface Props {
  idUser?: string
}
const useGetUsersDetail = ({ idUser }: Props) => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery<UserDetail>({
    refetchOnWindowFocus: false,
    queryKey: ['users-detail', id],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/manajemen-user/users/${idUser ?? id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    user: data,
    loading,
  }
}

export default useGetUsersDetail
