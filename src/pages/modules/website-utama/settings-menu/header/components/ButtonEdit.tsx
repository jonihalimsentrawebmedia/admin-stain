import { useForm } from 'react-hook-form'
import type { Menu } from '../model'
import { type ISettingMenuTypeForm, SettingMenuResolver } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import MenuForm from './MenuForm'
import { HiPencil } from 'react-icons/hi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

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
        className={'bg-yellow-500 text-white rounded p-1.5'}
        onClick={() => {
          setOpen(true)
          form.reset({
            ...data,
          })
        }}
      >
        <HiPencil />
      </button>

      <DialogBasic
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Menu'}
      >
        <MenuForm
          form={form}
          loading={loading}
          handleSave={handleSave}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEdit
