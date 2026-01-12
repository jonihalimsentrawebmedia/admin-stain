import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'
/**
 * Interface untuk detail konten yang ada di dalam field 'draft'
 */
export interface IDraftSatuanOrganisasi {
  id_satuan_organisasi: string
  kelompok: 'FAKULTAS' | 'UNIVERSITAS' | 'PRODI' | string // Bisa dibuat enum jika sudah pasti
  parent_id: string
  id_parent_satuan_organisasi: string
  logo: string
  favicon: string
  nama: string
  slug: string
  singkatan: string
  keyword: string
  is_alamat_sama_parent: boolean
  alamat: string
  provinsi: string
  kabupaten_kota: string
  kecamatan: string
  kelurahan: string
  kode_pos: string
  telepon: string
  fax: string
  email: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
  created_at: string // ISO Date String
  created_user: string
  updated_at: string // ISO Date String
  updated_user: string
  nama_jenjang_pendidikan: string | null
  kode_jenjang: string | null
  nama_parent: string
  nama_user_created: string
  nama_user_updated: string
  nama_parent_satuan_organisasi: string
  domain: string
  singkatan_universitas: string
  singkatan_fakultas: string | null
}

/**
 * Interface Utama untuk Respons Satuan Organisasi
 */
export interface ISatuanOrganisasi {
  id_draft: number
  id_satuan_organisasi: string
  draft: IDraftSatuanOrganisasi
  alasan_tolak: string | null
  status_publish: 'DRAFT' | 'DIPROSES' | 'PUBLISHED' | 'DITOLAK' // Sesuai status yang ada
  tanggal: string // "2026-01-12T12:25:48.368953+07:00"
  nama_satuan_organisasi: string
  nama_admin: string
  level: string
}
interface Props {
  kelompok?: string
  isFilter?: boolean
  isGetAll?: boolean
  idParent?: string
  searchFilter?: string
  limitFilter?: string
  pageFilter?: string
}

const useGetSatuanOrganisasiPengajuan = (props: Props) => {
  const [searchParams] = useSearchParams()
  const {
    kelompok: kelompokParam,
    isFilter,
    isGetAll,
    idParent,
    searchFilter,
    limitFilter,
    pageFilter,
  } = props
  const page = pageFilter ? pageFilter : searchParams.get('page') || '1'
  const limit = limitFilter ? limitFilter : searchParams.get('limit') || '10'
  const search = searchFilter ? searchFilter : searchParams.get('search') || ''
  const kelompok = kelompokParam ?? ''

  const id_parent = isFilter ? '' : idParent ? idParent : (searchParams.get('id_parent') ?? '')
  const ParamsSearch = new URLSearchParams({ page, limit, search, id_parent, kelompok })
  const ParamsSearchParent = new URLSearchParams({ id_parent, kelompok })

  const [satuanOrganisasi, setSatuanOrganisasi] = useState<ISatuanOrganisasi[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: [
      'editor-profile-satuan-organisasi-list',
      kelompok,
      { search, page, limit, id_parent },
    ],
    queryFn: () =>
      AxiosClient.get(`/editor/profil?${isGetAll ? ParamsSearchParent : ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    satuanOrganisasi,
    loading,
    meta,
  }
}

export default useGetSatuanOrganisasiPengajuan
