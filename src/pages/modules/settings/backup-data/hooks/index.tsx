import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import type { IBackupData } from "../model"

export const useGetStatusBackupData = () => {
  const { data, isLoading, isFetching } = useQuery<IBackupData>({
    queryKey: ['backup-data'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pengaturan/backup/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
