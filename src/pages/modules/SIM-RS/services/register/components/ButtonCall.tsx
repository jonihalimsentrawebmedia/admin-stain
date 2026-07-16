import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IRegistration } from '../data/types.ts'
import { format } from 'date-fns'

interface Props {
  data: IRegistration
}

export const ButtonCall = ({ data }: Props) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const nextLabel = data.status === 'MENUNGGU' ? 'Panggil' : 'Selesai'
  const nextColor =
    data.status === 'MENUNGGU'
      ? 'bg-amber-500 text-white hover:bg-amber-600'
      : 'bg-green-500 text-white hover:bg-green-600'

  const handleCall = async () => {
    const nextStatus = data.status === 'MENUNGGU' ? 'DIPANGGIL' : 'SELESAI'
    await AxiosClient.patch(
      `/simrs/pelayanan/pendaftaran/${data.id_pendaftaran}/status`,
      { status: nextStatus }
    )
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message || 'Berhasil')
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
        className={`px-3 py-1 rounded text-xs font-medium ${nextColor}`}
      >
        {nextLabel}
      </button>
      <DialogBasic
        open={open}
        setOpen={setOpen}
        title={data.status === 'MENUNGGU' ? 'Panggil Pasien' : 'Selesaikan Pelayanan'}
      >
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
          <p className="font-medium">Tanggal Daftar</p>
          <p>{format(new Date(data.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}</p>
        </div>
        <p className="mb-4 text-sm">
          {data.status === 'MENUNGGU'
            ? 'Apakah anda yakin ingin memanggil pasien ini?'
            : 'Apakah anda yakin ingin menyelesaikan pelayanan pasien ini?'}
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
            onClick={handleCall}
            className={`px-4 py-2 rounded text-white ${
              data.status === 'MENUNGGU'
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {nextLabel}
          </button>
        </div>
      </DialogBasic>
    </>
  )
}
