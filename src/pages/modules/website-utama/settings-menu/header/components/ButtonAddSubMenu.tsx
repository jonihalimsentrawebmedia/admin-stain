import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import MenuForm from './MenuForm'
import { useForm } from 'react-hook-form'
import { SettingMenuResolver, type ISettingMenuTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import type { Menu } from '../model'
interface Props {
  data: Menu
  menu_parent_name: string
}
const ButtonAddSubMenu = ({ data, menu_parent_name }: Props) => {
  const form = useForm<ISettingMenuTypeForm>({
    resolver: zodResolver(SettingMenuResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: ISettingMenuTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/menu', {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-menus'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data sub menu')
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
          form.reset({
            id_parent_menu: data.id_menu,
            sub_menu_parent: menu_parent_name,
          })
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah SubMenu
      </Button>

      <DialogCustom width='50%'  open={open} className={'rounded w-full lg:min-w-2xl '} setOpen={setOpen} title={'Tambah Menu'}>
        <MenuForm
        isSubMenu
          form={form}
          loading={loading}
          handleSave={handleSave}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonAddSubMenu
