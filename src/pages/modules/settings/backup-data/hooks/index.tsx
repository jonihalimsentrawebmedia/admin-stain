import { useEffect, useState } from "react"
import type { IBackupData } from "../model"
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetStatusBackupData = () => {
  const [session, setSession] = useState<IBackupData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['backup-data'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pengaturan/backup/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
