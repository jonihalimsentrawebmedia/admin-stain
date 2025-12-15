import { useEffect, useState } from "react"
import type { LogActivity } from "../../calendar-academic/model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetLogAcreditation = () => {
 const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { idAcreditation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-acreditation'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-log/${idAcreditation}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data??[])
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogAcreditation