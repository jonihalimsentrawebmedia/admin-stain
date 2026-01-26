import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  session?: ISessionUnit
  data: IUnitCollection
}

export const ButtonDeleteCollection = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/unit/kategori-koleksi/${data?.id_unit_kategori_koleksi}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['unit-collection'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Kategori Koleksi')
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
        className={'p-1.5 bg-red-500 hover:bg-red-600 text-white'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Kategori</p>}
        description={'Apakah anda yakin ingin menghapus kategori ini?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Pilih Unit</p>
          <p>{session?.nama_unit}</p>
          <p className="text-gray-500">Nama Kategori Koleksi</p>
          <p>{data?.nama_kategori}</p>
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
