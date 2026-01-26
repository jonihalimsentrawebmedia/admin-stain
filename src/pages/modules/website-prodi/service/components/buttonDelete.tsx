import { useState } from 'react'

import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import type { IServiceProdi } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonDeleteServiceProdi = (data: IServiceProdi) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/layanan/${data?.id_prodi_layanan}`).then((res) => {
      if (res.data.status) {
        setOpen(false)
        setLoading(false)
        queryClient.invalidateQueries({
          queryKey: ['service-prodi'],
        })
        toast.success(res.data.message || 'Success tambah layanan')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'bg-red-500 hover:bg-red-600 text-white p-1.5'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Layanan</p>}
        description={'Apakah anda yakin ingin menghapus layanan ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p>Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p>URL Layanan</p>
          <p>{data?.url_layanan}</p>

          <div className="col-span-2 flex items-center justify-end gap-2">
            <Button
              className={'text-primary border-primary hover:text-primary'}
              variant={'outline'}
              onClick={() => setOpen(!open)}
            >
              <BiX />
              Batal
            </Button>
            <Button disabled={loading} variant={'destructive'} onClick={HandleSave}>
              <FaTrash />
              Batal
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
