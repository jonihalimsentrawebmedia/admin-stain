import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

interface DetailFaculty {
  id_satuan_organisasi: string
  nama: string
}

const useGetDetailFaculty = () => {
const {id}=useParams()
  const { data, isLoading, isFetching } = useQuery<DetailFaculty>({
    queryKey: ['detail-faculty', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/program-studi/satuan-organisasi/fakultas/${id}`).then(
        (res) => res?.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detailFaculty: data, loading }
}

export default useGetDetailFaculty
