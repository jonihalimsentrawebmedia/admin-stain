import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import type { IAttendance } from './hooks.tsx'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data: IAttendance
}

export const ButtonDeleteAttendance = (props: props) => {
  const { data } = props
  const { id } = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/eoffice/acara/${id}/daftar-hadir/${data?.id_acara_daftar_hadir}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['attendance'],
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
        className={'p-1.5 bg-red-500 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash className={'size-4'} />
      </button>

      <DialogBasic title={'Hapus Daftar Hadir'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className={'text-gray-500'}>Nama Lengkap</p>
          <p>{data?.nama_lengkap}</p>
          <p className={'text-gray-500'}>Instansi</p>
          <p>{data?.nama_unit}</p>
          <p className={'text-gray-500'}>Nama Unit Kerja</p>
          <p>{data?.nama_unit_kerja}</p>
          <p className={'text-gray-500'}>Jabatan</p>
          <p>{data?.jabatan}</p>
          <p className={'text-gray-500'}>No Hp</p>
          <p>{data?.no_hp}</p>
        </div>
        <div className="flex gap-1.5 items-center justify-end">
          <Button
            variant={'outline'}
            className={'border border-primary text-primary hover:text-primary'}
            onClick={() => setOpen(!open)}
          >
            <BiX />
            Batal
          </Button>
          <Button variant={'destructive'} onClick={HandleDelete} disabled={loading}>
            <FaTrash className={'size-4'} />
            Hapus
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}
