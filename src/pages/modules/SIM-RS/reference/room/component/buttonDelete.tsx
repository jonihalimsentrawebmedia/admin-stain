import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IRoom } from '../data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data: IRoom
}

export const ButtonDeleteRoom = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/simrs/referensi/ruangan/${data?.id_ruangan}`)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menghapus data ruangan')
          queryClient.invalidateQueries({ queryKey: ['room'] })
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
        className={'lg:min-w-2xl rounded'}
        title={'Hapus Ruangan'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid gap-5 grid-cols-[12rem_1fr]'}>
          <p className="text-gray-500">Nama Ruangan</p>
          <p>{data.nama}</p>
          <p className="text-gray-500">Nomor</p>
          <p>{data.nomor}</p>
          <p className="text-gray-500">Jenis Ruangan</p>
          <p>{data.nama_jenis_ruangan}</p>
          <p className="text-gray-500">Jumlah Kasur</p>
          <p>{data.jumlah_kasur}</p>
          <p className="text-gray-500">Harga / Hari</p>
          <p>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(data.harga)}
          </p>
          <p className="text-gray-500">Lokasi</p>
          <p>{data.lokasi}</p>
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
                <>
                  <button
                    disabled={loading}
                    onClick={HandleSave}
                    className={'bg-red-500 flex items-center gap-1.5 px-3 text-white hover:bg-red-600 p-1.5 rounded'}
                  >
                    <FaTrash />
                    Hapus
                  </button>
                </>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
