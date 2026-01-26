import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  session?: ISessionUnit
  data?: ICategoryServices
}

export const ButtonDeleteCategoryService = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/kategori-layanan/${data?.id_kategori_layanan}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Kategori Layanan')
          queryClient.invalidateQueries({
            queryKey: ['category-services'],
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
        className={'p-1.5 text-white bg-red-500 hover:bg-red-600'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Kategori Laynaan</p>}
        description={'Apakah anda yakin untuk menghapus kategori layanan berikut ?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500">Nama Kategori Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
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
