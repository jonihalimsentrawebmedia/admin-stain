import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import type { ICategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props {
  rootData?: IUnitCollection
  data?: ICategoryCollection
}

export const ButtonDeleteCollectionCategory = (props: Props) => {
  const { rootData, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/unit/unit-koleksi/${rootData?.id_unit_kategori_koleksi}/koleksi/${data?.id_unit_koleksi}`
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['collection-category'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Koleksi')
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
        className={'p-1.5 bg-red-500 text-white hover:bg-red-600'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        disableOutsideDialog
        className={'rounded lg:max-w-7xl'}
        open={open}
        setOpen={setOpen}
        title={'Edit Koleksi'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Kategori Koleksi</p>
          <p>{rootData?.nama_kategori}</p>
          <p></p>
          <img
            src={data?.foto_url}
            alt={data?.nama_koleksi}
            className={'w-full rounded-lg object-cover size-[170px]'}
          />
          <p className="text-gray-500">Nama Layanan</p>
          <p>{data?.nama_koleksi}</p>
          <p className="text-gray-500">URL</p>
          <p>{data?.url}</p>
          <p className="text-gray-500">Uraian</p>
          <div
            className={`tiptap ProseMirror simple-editor line-clamp-8`}
            dangerouslySetInnerHTML={{ __html: data?.uraian ?? '' }}
          />
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
