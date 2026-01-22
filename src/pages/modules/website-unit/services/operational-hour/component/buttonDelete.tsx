import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IHourOperational } from '@/pages/modules/website-unit/services/operational-hour/data/types.ts'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'

interface Props {
  data: IHourOperational
}

export const ButtonDeleteOperationalHour = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/jam-operasional/${data?.id_unit_jam_operasional}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['operational-hour'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Jadwal Operasional')
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
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={'p-1.5 bg-red-500 hover:bg-red-600 text-white'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-3xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Jadwal Operasional'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Hari</p>
          <p>{data?.hari}</p>
          <p className="text-gray-500">Jam Operasional</p>
          <p>{data?.jam_operasional}</p>
          
          <div className="col-span-2 flex items-center justify-end gap-2">
            <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(false)}>
              <BiX />
              Batal
            </Button>
            <Button disabled={loading} variant={'destructive'} onClick={HandleSave}>
              <FaTrash />
              Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
