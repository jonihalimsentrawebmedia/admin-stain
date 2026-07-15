import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IJadwalDokterItem } from '../data/types.ts'

interface Props {
  data: IJadwalDokterItem
  id_dokter: string
}

export const ButtonDeleteJadwal = (props: Props) => {
  const { data, id_dokter } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/simrs/jadwal-dokter/${data.id_jadwal_dokter}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menghapus jadwal')
          queryClient.invalidateQueries({ queryKey: ['doctor-schedule', id_dokter] })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal menghapus data')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={'bg-red-500 text-white hover:bg-red-600 p-1.5 rounded'}
      >
        <FaTrash />
      </button>

      <DialogBasic
        className={'lg:min-w-xl rounded'}
        title={'Hapus Jadwal'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Hari</p>
          <p>{data.nama_hari}</p>
          <p className="text-gray-500">Jam Mulai</p>
          <p>{data.jam_mulai}</p>
          <p className="text-gray-500">Jam Selesai</p>
          <p>{data.jam_selesai}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(!open),
            },
            {
              type: 'custom',
              element: (
                <button
                  disabled={loading}
                  onClick={HandleSave}
                  className={
                    'bg-red-500 flex items-center gap-1.5 px-3 text-white hover:bg-red-600 p-1.5 rounded'
                  }
                >
                  <FaTrash />
                  Hapus
                </button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}