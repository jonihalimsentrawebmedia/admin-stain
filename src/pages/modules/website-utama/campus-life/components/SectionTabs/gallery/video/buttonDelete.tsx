import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import AxiosClient from '@/provider/axios.tsx'
import type { IGalleryVideoSearch } from '@/pages/modules/website-utama/campus-life/types'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data: IGalleryVideoSearch
}

export const ButtonDelete = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/kehidupan-kampus/galeri-video/${data?.id_kehidupan_kampus_galeri}`
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['video-gallery'],
          })
          queryClient.invalidateQueries({
            queryKey: ['video-gallery-selected'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        disabled={loading}
        className={'bg-red-500 text-white w-fit h-fit rounded p-1.5 hover:bg-red-600'}
        onClick={HandleDelete}
      >
        <FaTrash />
      </button>
    </>
  )
}
