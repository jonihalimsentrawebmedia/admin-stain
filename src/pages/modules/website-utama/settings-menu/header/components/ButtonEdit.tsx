import { useForm } from 'react-hook-form'
import type { Menu } from '../model'
import { SettingMenuResolver, type ISettingMenuTypeForm } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import MenuForm from './MenuForm'

interface Props {
  data: Menu
}
const ButtonEdit = ({ data }: Props) => {
  const form = useForm<ISettingMenuTypeForm>({
    resolver: zodResolver(SettingMenuResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: ISettingMenuTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/menu/${data.id_menu}`, {
      ...e,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-menus'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan update data menu')
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
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom width='50%' open={open} className={'rounded'} setOpen={setOpen} title={'Edit Menu'}>
        <MenuForm
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

export default ButtonEdit
