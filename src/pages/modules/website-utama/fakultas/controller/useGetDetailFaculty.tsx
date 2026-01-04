import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface DetailFaculty {
  id_satuan_organisasi: string
  nama: string
}

const useGetDetailFaculty = () => {
  const [detailFaculty, setDetailFaculty] = useState<DetailFaculty>()
const {id}=useParams()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/program-studi/satuan-organisasi/fakultas/${id}`).then(
        (res) => res?.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailFaculty(data)
    }
  }, [data])

  return { detailFaculty, loading }
}

export default useGetDetailFaculty
