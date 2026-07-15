import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IRegistration } from '../data/types.ts'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: IRegistration
}

export const ButtonDelete = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await AxiosClient.delete(`/simrs/pelayanan/pendaftaran/${data.id_pendaftaran}`)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil dihapus')
          queryClient.invalidateQueries({ queryKey: ['registration'] })
          queryClient.invalidateQueries({ queryKey: ['registration-status-count'] })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error')
      })
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded"
      >
        <FaTrash className="size-4" />
      </button>
      <DialogBasic open={open} setOpen={setOpen} title="Hapus Pendaftaran">
        <p className="mb-4">
          Apakah anda yakin ingin menghapus pendaftaran <strong>{data.no_pendaftaran}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </DialogBasic>
    </>
  )
}
