import { useEffect, useState } from "react"
import type { LogActivity } from "../model"
import type { Meta } from "@/components/common/table/TablePagination"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetLogAcademicActivity = () => {
  const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { idActivity } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-acedemic-year-activity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-kegiatan-log/${idActivity}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogAcademicActivity