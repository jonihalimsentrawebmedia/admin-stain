import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IhangeData {
  id_satuan_organisasi: string

  nama_pengaju: string
  level_pengaju: string
  tanggal_diajukan: string

  satuan_kerja: string

  current_profil: IProfileData
  pengajuan_profil: IProfileData
}
export interface IProfileData {
  id_satuan_organisasi: string
  kelompok: string

  logo: string | null
  favicon: string | null

  nama: string
  slug: string
  singkatan: string | null
  keyword: string | null

  is_alamat_sama_parent: boolean
  alamat: string | null
  provinsi: string | null
  kabupaten_kota: string | null
  kecamatan: string | null
  kelurahan: string | null
  kode_pos: string | null

  telepon: string | null
  fax: string | null
  email: string | null

  facebook: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_jenjang_pendidikan: string | null
  kode_jenjang: string | null

  nama_parent: string | null
  nama_parent_satuan_organisasi: string | null

  nama_user_created: string | null
  nama_user_updated: string | null

  domain: string | null
  singkatan_universitas: string | null
  singkatan_fakultas: string | null
}

export const UseGetChangeDataProfile = (id?: string) => {
  const [profileChangeData, setProfileChangeData] = useState<IhangeData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['editor-change-data-profile'],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/editor/profil/${id}/perbedaan-profile`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfileChangeData(data)
    }
  }, [data])

  return { profileChangeData, loading }
}
