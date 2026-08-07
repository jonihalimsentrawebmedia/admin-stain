import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import { IconDelete } from '@/components/common/table/icon'
import type { IMenu } from '../data/types'

interface Props {
  data: IMenu
  parentData?: IMenu
}

const ButtonDeleteSideMenu = ({ data, parentData }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleDelete() {
    setLoading(true)
    try {
      const res = await AxiosClient.delete(`/pengaturan/menu/${data.id_module}/${data.id_menu}`)

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-side-menu'],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <IconDelete />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Menu</p>}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Parent</p>
          <p>{parentData?.label ?? 'Menu Utama'}</p>
          <p className="text-gray-500">Label</p>
          <p className="font-medium">“{data.label}”</p>
          <p className="text-gray-500">Link</p>
          <p>{data.link || '-'}</p>
        </div>

        <p className="mt-4">
          Apakah Anda yakin untuk menghapus menu{' '}
          <span className="font-bold">“{data.label}”</span>?
        </p>

        <div className="flex gap-4 items-center justify-end mt-4">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonDeleteSideMenu
