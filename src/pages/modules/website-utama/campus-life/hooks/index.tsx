import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetCampusLifeIntroduction = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-introduction'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-pengantar').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { introduction: data, loading }
}

export const UseGetCampusLifeFacilities = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-facilities'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-fasilitas').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { campusFacilities: data, loading }
}

export const UseGetCampusActivityUnit = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-activity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-unit-kegiatan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { campusActivity: data, loading }
}

export const UseGetCampusPerformance = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-performance'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-prestasi').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { campusPerformance: data, loading }
}

export const UseGetCampusTestimonial = () => {
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

  return { testimonial: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetCampusTestimonialDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['campus-life-testimonial-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus-testimoni/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { testimonialDetail: data, loading }
}

export const UseGetListVideoGallery = () => {
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

  return { videoGallery: data ?? [], loading }
}

export const UseGetVideoGallerySelected = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['video-gallery-selected'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-video').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { videoSelected: data ?? [], loading }
}

export const UseGetUrlDirection = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['url-direction-campus-life'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus-link-arahan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { urlDirection: data, loading }
}

export const UseGetListPhotoGallery = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-gallery'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-foto-search').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { photoGallery: data ?? [], loading }
}

export const UseGetPhotoGallerySelected = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-gallery-selected'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/kehidupan-kampus/galeri-foto').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { photoSelected: data ?? [], loading }
}

export const UseGetCampusLifeBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-campus-life'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kehidupan-kampus-background`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  return { background: data ?? [], loading }
}
