import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaTrash } from 'react-icons/fa'
import { format } from 'date-fns'
import type { ICPPTItem } from '../data/types'

interface Props {
  data: ICPPTItem
}

export const ButtonDeleteCPPT = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/simrs/pelayanan/rawat-inap/${data.id_pendaftaran}/cppt/${data.id_cppt}`
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menghapus catatan CPPT')
          queryClient.invalidateQueries({ queryKey: ['cppt', data.id_pendaftaran] })
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal menghapus catatan CPPT')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
        className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded"
      >
        <FaTrash className="size-3" />
      </button>

      <DialogBasic
        open={open}
        setOpen={setOpen}
        title="Hapus Catatan CPPT"
        className="lg:min-w-2xl rounded"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Apakah anda yakin ingin menghapus catatan CPPT ini?
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Tanggal Catat</p>
              <p className="font-medium">
                {format(new Date(data.tanggal_catat), 'dd-MM-yyyy HH:mm')}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Dokter</p>
              <p className="font-medium">{data.nama_dokter}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Keluhan</p>
              <p className="font-medium">{data.keluhan}</p>
            </div>
          </div>
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
              disabled={loading}
              onClick={HandleDelete}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 flex items-center gap-1.5"
            >
              <FaTrash className="size-3" />
              {loading ? 'Menghapus...' : 'Hapus'}
            </button>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}
