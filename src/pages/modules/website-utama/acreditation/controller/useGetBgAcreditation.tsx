import { useEffect, useState } from "react"
import type { ImageCalendarAcademic } from "../../calendar-academic/background/CalendarAcademicBackgroundView"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

const useGetBgAcreditation = () => {
 const [background, setBackground] = useState<ImageCalendarAcademic[]>([])




  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bg-acreditation'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-background`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data?.data??[])
    
    }
  }, [data])

  return {  loading, background }
}

export default useGetBgAcreditation