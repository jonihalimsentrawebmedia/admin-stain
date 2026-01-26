import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import type { ListServices } from '@/pages/modules/website-unit/services/list/data/types.ts'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'

interface Props {
  rootData?: ICategoryServices
  data?: ListServices
}

export const ButtonDeleteListCategory = (props: Props) => {
  const { rootData, data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/unit/layanan/${rootData?.id_kategori_layanan}/layanan/${data?.id_layanan}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-service'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Layanan')
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
        className={'p-1.5 bg-red-500 hover:bg-red-600 text-white'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-3xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Layanan</p>}
        description={'Apakah anda yakin untuk menghapus layanan berikut ?'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Kategori Layanan</p>
          <p>{rootData?.nama_layanan}</p>
          <p className="text-gray-500"></p>
          <img src={data?.foto_url} alt="foto" className="object-cover size-24" />
          <p className="text-gray-500">Nama Layanan</p>
          <p>{data?.nama_layanan}</p>
          <p className="text-gray-500">URL</p>
          <p>{data?.link}</p>
          <p className="text-gray-500">Kontak</p>
          <p>{data?.kontak}</p>
          <p className="text-gray-500">Uraian</p>
          <p>{data?.uraian}</p>
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
