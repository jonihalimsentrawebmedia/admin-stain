import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { IconDelete } from '@/components/common/table/icon'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Menu } from '../model'
import { useForm } from 'react-hook-form'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'

interface Props {
  isSubMenu?: boolean
  data: Menu
  menu_parent_name?: string
}
const ButtonDelete = ({ data, isSubMenu, menu_parent_name }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const field: any = [
    {
      name: 'nama_menu',
      label: 'Nama Menu*',
    },

    {
      name: 'controller',
      label: 'Controller*',
    },
    {
      name: 'halaman',
      label: 'Halaman?*',
    },
    {
      name: 'status',
      label: 'Status*',
      component: <div>{data.status == 'Y' ? 'Ya' : 'Tidak'}</div>,
    },
    {
      name: 'urutan',
      label: 'Urutan*',
    },
  ]
  const fieldSubMenu: any = [
    {
      name: 'menu_parent_name',
      label: 'Nama Menu*',
    },
    {
      name: 'nama_menu',
      label: 'Nama Submenu*',
    },

    {
      name: 'controller',
      label: 'Controller*',
    },
    {
      name: 'halaman',
      label: 'Halaman?*',
    },
    {
      name: 'status',
      label: 'Status*',
      component: <div>{data.status == 'Y' ? 'Ya' : 'Tidak'}</div>,
    },
    {
      name: 'urutan',
      label: 'Urutan*',
    },
  ]
  const queryClient = useQueryClient()
 
  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/menu/${data?.id_menu}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Menu')
          queryClient.invalidateQueries({
            queryKey: ['list-menus'],
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
        onClick={() => {
          setOpen(!open)
          form.reset({
            ...data,
            menu_parent_name: menu_parent_name,
            halaman: data.halaman ? 'Ya' : 'Tidak',
          })
        }}
      >
        <IconDelete />
      </button>

      <DialogCustom
        open={open}
        width="50%"
        className={'rounded'}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Menu</p>}
        description={'Apakah anda yakin untuk menghapus data ini?'}
      >
        <DetailField data={isSubMenu ? fieldSubMenu : field} form={form} />
        <div className="flex gap-4 items-center justify-end">
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

export default ButtonDelete
