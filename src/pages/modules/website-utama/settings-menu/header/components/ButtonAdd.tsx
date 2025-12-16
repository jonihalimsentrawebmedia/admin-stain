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

const ButtonAdd = () => {
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
          toast.success(res.data.message || 'Success Pengajuan tambah data menu')
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
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah Menu
      </Button>

      <DialogCustom
        width="50%"
        open={open}
        className={'rounded'}
        setOpen={setOpen}
        title={'Tambah Menu'}
      >
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

export default ButtonAdd
