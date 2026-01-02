import { useEffect, useState } from "react"
import type { OrganizationalStructure } from "../model/organizational-structure"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"


const useGetOrganizationalStructure = () => {
 const [organizationalStructureDetail, setOrganizationalStructureDetail] =
    useState<OrganizationalStructure>()
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-struktur-organisasi'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/struktur-organisasi`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOrganizationalStructureDetail(data?.data)
    }
  }, [data])

  return { organizationalStructureDetail, loading }
}

export default useGetOrganizationalStructure