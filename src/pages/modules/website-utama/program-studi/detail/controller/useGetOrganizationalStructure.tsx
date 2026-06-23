import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"


const useGetOrganizationalStructure = () => {
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-struktur-organisasi'],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/struktur-organisasi`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { organizationalStructureDetail: data?.data, loading }
}

export default useGetOrganizationalStructure