import { useEffect, useState } from "react"
import type { GaleriAlbum } from "../model/gallery"
import type { Meta } from "@/components/common/table/TablePagination"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetGallery = () => {
  const [gallery, setGallery] = useState<GaleriAlbum[]>([])
   const [meta, setMeta] = useState<Meta>()
   const { id } = useParams()
 
   const { data, isLoading, isFetching } = useQuery({
     queryKey: ['program-studi-gallery'],
     refetchOnWindowFocus: false,
     queryFn: () =>
       AxiosClient.get(`/website-utama/satuan-organisasi/${id}/galeri-album`).then(
         (res) => res.data
       ),
   })
 
   const loading = isLoading || isFetching
 
   useEffect(() => {
     if (data) {
    
       setGallery(data?.data ?? [])
       setMeta(data.meta)
     }
   }, [data])
 
   return { gallery, loading, meta }
}

export default useGetGallery