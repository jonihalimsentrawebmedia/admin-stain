import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IResepObatDetail } from '../data/types.ts'

interface Props {
  idResep: string
  item: IResepObatDetail
}

export const ButtonStatusObat = ({ idResep, item }: Props) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [alasan, setAlasan] = useState('')
  const queryClient = useQueryClient()

  const isDisabled = item.status !== 'MENUNGGU'

  const handleOpen = () => {
    if (isDisabled) return
    setStatus('')
    setAlasan('')
    setOpen(true)
  }

  const handleConfirm = async () => {
    if (!status) {
      toast.error('Pilih status terlebih dahulu')
      return
    }
    if (status === 'DIBATALKAN' && !alasan.trim()) {
      toast.error('Alasan pembatalan harus diisi')
      return
    }

    const payload: Record<string, string> = { status }
    if (status === 'DIBATALKAN') {
      payload.alasan_pembatalan = alasan
    }

    await AxiosClient.put(`/simrs/farmasi/resep/${idResep}/obat/${item.id_resep_obat}/status`, {
      status_resep_obat: payload?.status,
    })
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil')
          queryClient.invalidateQueries({ queryKey: ['detail-prescription', idResep] })
          queryClient.invalidateQueries({ queryKey: ['prescription'] })
          queryClient.invalidateQueries({ queryKey: ['prescription-status-count'] })
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
        onClick={handleOpen}
        disabled={isDisabled}
        className={`px-3 py-1 rounded text-xs font-medium ${
          isDisabled
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {item.status === 'MENUNGGU'
          ? 'Atur Status'
          : item.status === 'DISERAHKAN'
            ? 'Diserahkan'
            : 'Dibatalkan'}
      </button>
      <DialogBasic open={open} setOpen={setOpen} title="Konfirmasi Status Obat">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Nama Obat</p>
            <p className="text-sm">{item.nama_obat}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option disabled value="">
                -- Pilih Status --
              </option>
              <option value="DISERAHKAN">Diserahkan</option>
              <option value="DIBATALKAN">Dibatalkan</option>
            </select>
          </div>
          {status === 'DIBATALKAN' && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Alasan Pembatalan</p>
              <textarea
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                rows={3}
                placeholder="Masukkan alasan pembatalan..."
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50 text-sm"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 rounded text-white bg-primary hover:bg-primary/90 text-sm"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </DialogBasic>
    </>
  )
}
