import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  ICampusLifeAchievements,
  ICampusLifeFacilities,
  ICampusLifeIntroduction,
  ICampusLifeUnitActivities,
  IGalleryPhotoSearch,
  IGalleryVideoSearch,
  ITestimonialCampusLife,
  IUrlDirectionCampusLife,
} from '@/pages/modules/website-utama/campus-life/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetCampusLifeIntroduction = () => {
  const [introduction, setIntroduction] = useState<ICampusLifeIntroduction>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-introduction'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-pengantar').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setIntroduction(data)
    }
  }, [data])

  return { introduction, loading }
}

export const UseGetCampusLifeFacilities = () => {
  const [campusFacilities, setCampusFacilities] = useState<ICampusLifeFacilities>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-facilities'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-fasilitas').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCampusFacilities(data)
    }
  }, [data])

  return { campusFacilities, loading }
}

export const UseGetCampusActivityUnit = () => {
  const [campusActivity, setCampusActivity] = useState<ICampusLifeUnitActivities>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-activity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-unit-kegiatan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCampusActivity(data)
    }
  }, [data])

  return { campusActivity, loading }
}

export const UseGetCampusPerformance = () => {
  const [campusPerformance, setCampusPerformance] = useState<ICampusLifeAchievements>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-performance'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-prestasi').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCampusPerformance(data)
    }
  }, [data])

  return { campusPerformance, loading }
}

export const UseGetCampusTestimonial = () => {
  const [testimonial, setTestimonial] = useState<ITestimonialCampusLife[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-testimonial', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus-testimoni?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching
  useEffect(() => {
    if (data) {
      setTestimonial(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { testimonial, loading, meta }
}

export const UseGetCampusTestimonialDetail = (id: string) => {
  const [testimonialDetail, setTestimonialDetail] = useState<ITestimonialCampusLife>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-testimonial-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus-testimoni/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTestimonialDetail(data)
    }
  }, [data])

  return { testimonialDetail, loading }
}

export const UseGetListVideoGallery = () => {
  const [videoGallery, setVideoGallery] = useState<IGalleryVideoSearch[]>([])

  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['video-gallery', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus/galeri-video-search?${ParamsSearch}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVideoGallery(data ?? [])
    } else {
      setVideoGallery([])
    }
  }, [data])

  return { videoGallery, loading }
}

export const UseGetVideoGallerySelected = () => {
  const [videoSelected, setVideoSelected] = useState<IGalleryVideoSearch[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['video-gallery-selected'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-video').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVideoSelected(data)
    }
  }, [data])

  return { videoSelected, loading }
}

export const UseGetUrlDirection = () => {
  const [urlDirection, setUrlDirection] = useState<IUrlDirectionCampusLife>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['url-direction-campus-life'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-link-arahan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUrlDirection(data)
    }
  }, [data])

  return { urlDirection, loading }
}

export const UseGetListPhotoGallery = () => {
  const [photoGallery, setPhotoGallery] = useState<IGalleryVideoSearch[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-gallery'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-foto-search').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPhotoGallery(data)
    }
  }, [data])

  return { photoGallery, loading }
}

export const UseGetPhotoGallerySelected = () => {
  const [photoSelected, setPhotoSelected] = useState<IGalleryPhotoSearch[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-gallery-selected'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-foto').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPhotoSelected(data)
    }
  }, [data])

  return { photoSelected, loading }
}

export const UseGetCampusLifeBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-campus-life'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus-background`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])
  
  return { background, loading }
}
