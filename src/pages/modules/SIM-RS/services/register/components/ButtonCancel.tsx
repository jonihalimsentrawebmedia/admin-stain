import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IRegistration } from '../data/types.ts'
import { HiX } from 'react-icons/hi'

interface Props {
  data: IRegistration
}

export const ButtonCancel = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const [alasan, setAlasan] = useState('')
  const queryClient = useQueryClient()

  const handleCancel = async () => {
    await AxiosClient.patch(
      `/simrs/pelayanan/pendaftaran/${data.id_pendaftaran}/status`,
      { status: 'DIBATALKAN', alasan_batalkan: alasan }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil dibatalkan')
          queryClient.invalidateQueries({ queryKey: ['registration'] })
          queryClient.invalidateQueries({ queryKey: ['registration-status-count'] })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error')
      })
    setOpen(false)
    setAlasan('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-gray-500 text-white hover:bg-gray-600 p-1.5 rounded"
      >
        <HiX className="size-4" />
      </button>
      <DialogBasic open={open} setOpen={setOpen} title="Batalkan Pendaftaran">
        <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-3 mb-4 text-sm">
          <p className="font-medium">No. Pendaftaran</p>
          <p>{data.no_pendaftaran}</p>
          <p className="font-medium">Nama Pasien</p>
          <p>{data.nama_pasien}</p>
          <p className="font-medium">No. Rekam Medis</p>
          <p>{data.no_rekam_medis_pasien}</p>
          <p className="font-medium">Poli</p>
          <p>{data.nama_poli}</p>
          <p className="font-medium">Dokter</p>
          <p>{data.nama_dokter}</p>
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium mb-1 block">Alasan Pembatalan *</label>
          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className="w-full border rounded p-2 text-sm bg-white resize-none"
            rows={3}
            placeholder="Masukkan alasan pembatalan..."
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => { setOpen(false); setAlasan('') }}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-50"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!alasan.trim()}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            Ya, Batalkan
          </button>
        </div>
      </DialogBasic>
    </>
  )
}
