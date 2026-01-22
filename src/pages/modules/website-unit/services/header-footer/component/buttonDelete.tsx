import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IUnitHeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer/data/types.ts'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export const ButtonDeleteServiceHeaderFooter = (data?: IUnitHeaderFooterServices) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/layanan-header-footer/${data?.id_unit_layanan_header_footer}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['header-footer'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Layanan Header Footer')
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
        className={'bg-red-500 text-white p-1.5 hover:bg-red-600'}
        disabled={loading}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-3xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan Header Footer'}
        description={'Apakah anda yakin untuk menghapus layanan berikut'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p className="text-gray-500">URL Layanan</p>
          <Link
            to={data?.url ?? '#'}
            className={'text-blue-500 underline underline-offset-4 decoration-blue-500'}
          >
            Buka URL
          </Link>
          <p className="text-gray-500">Posisi Aktif</p>
          {data?.is_header && 'Header'} {data?.is_footer && 'Footer'}
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
