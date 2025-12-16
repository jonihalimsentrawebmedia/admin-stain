import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import ModuleForm from './ModuleForm'
import ButtonForm from '@/components/common/button/ButtonForm'
import { ModuleResolver, type ModuleType } from '../model'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

const ButtonAddModule = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<ModuleType>({
    resolver: zodResolver(ModuleResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ModuleType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/pengaturan/modules`, {
        ...data,
        urutan: Number(data.urutan),
      })

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['modules-list'],
        })
        setOpen(false)
        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        <HiPlus />
        Tambah Modul
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Modul</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ModuleForm form={form} />
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonAddModule
