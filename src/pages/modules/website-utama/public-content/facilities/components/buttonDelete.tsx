import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import type { IFacilitiesDetail } from '@/pages/modules/website-utama/public-content/facilities/data'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'

export const ButtonDeleteFacilities = (data: IFacilitiesDetail) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/fasilitas/${data?.id_fasilitas}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-facilities'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-facilities'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 text-white hover:bg-red-600 rounded p-1.5'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Fasilitas</p>}
        description={'Apakah anda yakin untuk menghapus Fasilitas yang ditulis?'}
      >
        <div className="flex items-center justify-center">
          <img src={data?.gambar} alt="image" className={'w-[320px] h-[240px] object-cover'} />
        </div>
        <p className="text-gray-500">Nama Fasilitas</p>
        <p>{data?.nama_fasilitas}</p>
        <p className="text-gray-500">Alamat</p>
        <p>{data?.alamat}</p>
        <p className="text-gray-500">No. Hp</p>
        <p>{data?.no_hp_pembantu}</p>
        <p className="text-gray-500">Email</p>
        <p>{data?.email_pembantu}</p>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant={'outline'}
            onClick={() => setOpen(!open)}
            className={'border border-primary text-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button disabled={loading} onClick={HandlerDelete} variant={'destructive'}>
            <FaTrash />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
