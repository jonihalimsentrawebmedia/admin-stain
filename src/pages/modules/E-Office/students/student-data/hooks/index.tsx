import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentData } from '../data/types.ts'

interface props extends BasicProps {
  angkatan?: string
  id_jalur_masuk?: string
  id_fakultas: string
  id_prodi: string
}

export const UseGetStudentData = (props?: props) => {
  const { search, limit, page, angkatan, id_jalur_masuk, id_fakultas, id_prodi } = props ?? {}
  const [studentData, setStudentData] = useState<IStudentData[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (angkatan) Params.append('angkatan', angkatan ?? '')
  if (id_jalur_masuk) Params.append('id_jalur_masuk', id_jalur_masuk ?? '')
  if (id_fakultas) Params.append('id_fakultas', id_fakultas ?? '')
  if (id_prodi) Params.append('id_prodi', id_prodi ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['student-data', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentData(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, studentData }
}

export const UseGetDetailStudentData = (id: string) => {
  const [studentData, setStudentData] = useState<IStudentData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['student-data-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentData(data)
    }
  }, [data])

  return { studentData, loading }
}

export const UseGetYearLevel = () => {
  const [yearLevel, setYearLevel] = useState<number[]>([])
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-level'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/mahasiswa/filter-tahun-angkatan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYearLevel(data)
    }
  }, [data])

  return { yearLevel, loading }
}
