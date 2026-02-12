import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import TemplateAimForm from './TemplateAimForm'
import { TemplateAimInstutationResolver, type TemplateAimInstutationType } from '../model/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

const ButtonAdd = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<TemplateAimInstutationType>({
    resolver: zodResolver(TemplateAimInstutationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: TemplateAimInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/lembaga/template-aim`, {
        ...data,
        urutan: Number(data.urutan),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['template-aim-lembaga'],
        })

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
        Tambah data
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Template AIM</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <TemplateAimForm form={form} />
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

export default ButtonAdd
