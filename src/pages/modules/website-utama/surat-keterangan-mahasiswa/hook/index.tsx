import { useEffect, useState } from 'react'
import type {
  IStepApproval,
  IStudentLetter,
} from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetStepApproved = () => {
  const [stepApproval, setStepApproval] = useState<IStepApproval>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['step-approval'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/surat-mahasiswa-pengajuan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStepApproval(data)
    }
  }, [data])

  return { stepApproval, loading }
}

export const UseGetStudentLetter = () => {
  const [studentLetter, setStudentLetter] = useState<IStudentLetter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['surat-keterangan-mahasiswa'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/surat-keterangan-mahasiswa').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentLetter(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { studentLetter, loading, meta }
}

export const UseGetStudentLetterById = (id: string) => {
  const [studentLetter, setStudentLetter] = useState<IStudentLetter>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['surat-keterangan-mahasiswa-by-id', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentLetter(data)
    }
  }, [data])

  return { studentLetter, loading }
}

export const UseGetLetterStudentBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-student-letter'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa-background`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

export const UseGetLogLetterStudent = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-letter', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/surat-keterangan-mahasiswa-log/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
