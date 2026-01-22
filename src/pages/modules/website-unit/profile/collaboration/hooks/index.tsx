import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IAreaCollaboration,
  ICategoryCollaboration,
  ICollaborationList,
  ISubCategoryCollaboration,
  ISubPropsAction,
  ITypeCollaboration,
  PropsAction,
} from '../data/types.ts'

export const UseGetUnitCollaboration = () => {
  const [unitCollaboration, setUnitCollaboration] = useState<ICollaborationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-collaboration'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/kerjasama').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { unitCollaboration, loading, meta }
}

export const UseGetUnitCollaborationDetail = (id: string) => {
  const [unitCollaboration, setUnitCollaboration] = useState<ICollaborationList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-collaboration-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/kerjasama/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitCollaboration(data)
    }
  }, [data])

  return { unitCollaboration, loading }
}

export const UseGetAreaCollaboration = (props?: PropsAction) => {
  const { isGetAll, page, search, limit } = props ?? {}
  const [areaCollaboration, setAreaCollaboration] = useState<IAreaCollaboration[]>([])
  const [meta, setMeta] = useState<Meta>()

  let ParamsSearch: URLSearchParams

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
    if (search) ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams()
    if (page) ParamsSearch.append('page', page ?? '1')
    if (limit) ParamsSearch.append('limit', limit ?? '10')
    if (search) ParamsSearch.append('search', search)
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['area-collaboration', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/bidang-kerjasama?${ParamsSearch.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAreaCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { areaCollaboration, loading, meta }
}

export const UseGetTypeCollaboration = (props: PropsAction) => {
  const { isGetAll, page, search, limit } = props ?? {}
  const [typeCollaboration, setTypeCollaboration] = useState<ITypeCollaboration[]>([])
  const [meta, setMeta] = useState<Meta>()

  let ParamsSearch = new URLSearchParams()

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
    if (search) ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams()
    if (page) ParamsSearch.append('page', page ?? '1')
    if (limit) ParamsSearch.append('limit', limit ?? '10')
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-collaboration', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/jenis-kerjasama?${ParamsSearch.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { typeCollaboration, loading, meta }
}

export const UseGetCategoryCollaboration = (props: PropsAction) => {
  const { isGetAll, page, search, limit } = props ?? {}
  const [categoryCollaboration, setCategoryCollaboration] = useState<ICategoryCollaboration[]>([])
  const [meta, setMeta] = useState<Meta>()

  let ParamsSearch = new URLSearchParams()

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
    if (search) ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams()
    if (page) ParamsSearch.append('page', page ?? '1')
    if (limit) ParamsSearch.append('limit', limit ?? '10')
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-collaboration', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/kategori-kerjasama?${ParamsSearch.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCategoryCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { categoryCollaboration, loading, meta }
}

export const UseGetSubCategoryCollaboration = (props: ISubPropsAction) => {
  const { categoryId, isGetAll, page, search, limit } = props ?? {}
  const [subCategoryCollaboration, setSubCategoryCollaboration] = useState<
    ISubCategoryCollaboration[]
  >([])
  const [meta, setMeta] = useState<Meta>()

  let ParamsSearch = new URLSearchParams()

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
    if (search) ParamsSearch.append('search', search)
    if (categoryId) ParamsSearch.append('id_kategori_kerjasama', categoryId)
  } else {
    ParamsSearch = new URLSearchParams()
    if (categoryId) ParamsSearch.append('id_kategori_kerjasama', categoryId)
    if (page) ParamsSearch.append('page', page ?? '1')
    if (limit) ParamsSearch.append('limit', limit ?? '10')
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['sub-category-collaboration', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/sub-kategori-kerjasama?${ParamsSearch.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubCategoryCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { subCategoryCollaboration, loading, meta }
}
