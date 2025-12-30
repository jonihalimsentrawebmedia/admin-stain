import { Button } from '@/components/ui/button.tsx'
import type { IGalleryPhotoSearch } from '@/pages/modules/website-utama/campus-life/types'
import { IoMdCheckmark } from 'react-icons/io'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data?: IGalleryPhotoSearch
  idChange?: string
}

export const ButtonPhotoSelected = (props: Props) => {
  const { data, idChange } = props

  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const HandleSelected = async () => {
    setLoading(true)
    if (idChange) {
      await AxiosClient.patch(`/website-utama/kehidupan-kampus/galeri-foto-replace/${idChange}`, {
        id_galeri_baru: data?.id_galeri_foto,
      })
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            toast.success(res.data.message || 'Success Pengajuan tambah data berita')
            queryClient.invalidateQueries({
              queryKey: ['photo-gallery'],
            })
            queryClient.invalidateQueries({
              queryKey: ['photo-gallery-selected'],
            })
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        })
    } else {
      await AxiosClient.post(`/website-utama/kehidupan-kampus/galeri-foto/${data?.id_galeri_foto}`)
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            toast.success(res.data.message || 'Success Pengajuan tambah data berita')
            queryClient.invalidateQueries({
              queryKey: ['photo-gallery'],
            })
            queryClient.invalidateQueries({
              queryKey: ['photo-gallery-selected'],
            })
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        })
    }
  }

  return (
    <>
      {data?.is_dipilih ? (
        <Button disabled={data?.is_dipilih}>Sudah Dipilih</Button>
      ) : (
        <Button disabled={loading} onClick={HandleSelected}>
          <IoMdCheckmark />
          Pilih
        </Button>
      )}
    </>
  )
}
