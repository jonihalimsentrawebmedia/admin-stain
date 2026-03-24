import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export interface INewsFaculty {
  status: 'Y' | 'N' // Status aktif
  status_publish: 'PUBLISHED' | 'DRAFT' | 'REJECTED' | string // Status publikasi
  publish: 'Y' | 'N' // Apakah sudah dipublish
  diajukan_at: string // Waktu pengajuan
  ditolak_at: string | null // Waktu ditolak
  disetujui_at: string | null // Waktu disetujui
  diterbitkan_at: string | null // Waktu diterbitkan
  proses_at: string | null // Waktu diproses
  published_at: string | null // Waktu publish
  unpublished_at: string | null // Waktu unpublish
  tanggal_berita: string // Tanggal berita
  created_at: string // Waktu dibuat
  updated_at: string // Waktu terakhir diupdate
  diajukan_user: string // UUID pengaju
  ditolak_user: string | null // UUID penolak
  disetujui_user: string | null // UUID penyetuju
  proses_user: string | null // UUID pemroses
  published_user: string | null // UUID publisher
  unpublished_user: string | null // UUID unpublisher
  created_user: string // UUID pembuat
  updated_user: string // UUID pengupdate
  nama_disetujui: string | null // Nama penyetuju
  nama_published: string | null // Nama publisher
  nama_diajukan: string | null // Nama pengaju
  nama_ditolak: string | null // Nama penolak
  nama_proses: string | null // Nama pemroses
  nama_unpublished: string | null // Nama unpublisher
  nama_user: string // Nama user (entah siapa)
  nama_user_created: string // Nama pembuat
  nama_user_updated: string // Nama pengupdate
  id_berita: string // UUID berita
  id_satuan_organisasi: string // UUID satuan organisasi
  id_kategori_berita: string // UUID kategori berita
  nama_satuan_organisasi: string // Nama satuan organisasi
  nama_kategori_berita: string // Nama kategori berita
  judul: string
  slug: string
  isi_berita: string // HTML content
  penulis: string
  baca: number // Jumlah pembaca
  alasan_ditolak: string // Alasan penolakan (bisa kosong)
  gambar: string // URL gambar utama
  gambar_key: string // Key gambar di storage
  keterangan_gambar: string // Keterangan gambar
  berita_gambar_tambahan: any[] // Array gambar tambahan (format belum jelas)
  nama_level: string // Level user (Administrator, dll)
}

interface NewsProps extends BasicProps {
  id_unit: string
}

export const UseGetNewsProdiFaculty = (props?: NewsProps) => {
  const { id_unit, limit, search, page } = props ?? {}

  const [news, setNews] = useState<INewsFaculty[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['news-faculty', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/berita?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNews(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { news, loading, meta }
}
