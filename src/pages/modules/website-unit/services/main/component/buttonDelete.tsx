import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IUnitMainService } from '@/pages/modules/website-unit/services/main/data/types.ts'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data?: IUnitMainService
}

export const ButtonDeleteMainService = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/layanan-utama/${data?.id_unit_layanan_utama}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Layanan Utama')
          queryClient.invalidateQueries({
            queryKey: ['main-service'],
          })
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
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Layanan Utama</p>}
        description={'Apakah anda yakin untuk menghapus layanan utama berikut ?'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Nama Kategori Layanan</p>
          <p>{data?.nama_kategori_layanan}</p>
          <p className="text-gray-500">Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p className="text-gray-500">Uraian</p>
          <p>{data?.uraian_layanan}</p>
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
      </DialogBasic>
    </>
  )
}
