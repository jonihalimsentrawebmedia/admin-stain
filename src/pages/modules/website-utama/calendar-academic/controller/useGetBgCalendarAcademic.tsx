import { useQuery } from "@tanstack/react-query"
import type { ImageCalendarAcademic } from "../background/CalendarAcademicBackgroundView"
import AxiosClient from "@/provider/axios"
import { useEffect, useState } from "react"


const useGetBgCalendarAcademic = () => {
const [background, setBackground] = useState<ImageCalendarAcademic[]>([])




  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bg-calendar-academic'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-background`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data?.data)
    
    }
  }, [data])

  return {  loading, background }
}

export default useGetBgCalendarAcademic