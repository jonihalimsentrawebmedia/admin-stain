import type { IEvent } from '../data/types.ts'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { format } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

interface Props {
  data: IEvent
}

const ButtonDeleteEvent = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/acara/${data?.id_acara}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['event-activity'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        className="p-1.5 text-blue-500 bg-primary/15 hover:bg-primary/15 rounded"
        onClick={() => setOpen(!open)}
      >
        <FaTrash className={'size-5 text-red-500'} />
      </button>

      <DialogBasic title={'Hapus Acara'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className={'text-gray-500'}>Nama Kegiatan</p>
          <p>{data?.nama_kegiatan}</p>
          <p className={'text-gray-500'}>Tanggal Mulai</p>
          <p>{data?.tanggal_mulai ? format(data?.tanggal_mulai, 'dd-MM-yyyy') : ''}</p>
          <p className={'text-gray-500'}>Tanggal Selesai</p>
          <p>{data?.tanggal_selesai ? format(data?.tanggal_selesai, 'dd-MM-yyyy') : ''}</p>
          <p className={'text-gray-500'}>Penyelenggara</p>
          <p>{data?.penyelenggara}</p>
          <p className={'text-gray-500'}>Waktu </p>
          <p>{data?.waktu}</p>
          <p className={'text-gray-500'}>Tempat</p>
          <p>{data?.tempat}</p>
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <Button
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
            onClick={() => setOpen(!open)}
          >
            <BiX />
            Batal
          </Button>
          <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
            <FaTrash /> Hapus
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
export default ButtonDeleteEvent
