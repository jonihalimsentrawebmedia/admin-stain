import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { ShortcutResolver, type ShortcutType } from '../model/resolver'
import ImageUpload from './ImageUpload'
import TextInput from '@/components/common/form/TextInput'

const ButtonAdd = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<ShortcutType>({
    resolver: zodResolver(ShortcutResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ShortcutType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/pintasan`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['shortcut'],
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
        title={<p className="text-2xl ">Tambah Pintasan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <ImageUpload maxSizeMB={2} form={form} name="url_gambar" label="" />
                <TextInput
                  form={form}
                  name="nama_pintasan"
                  label="Nama Pintasan"
                  isRow
                  placeholder="Pintasan"
                />
              </div>

              <div className="text-center">
                <ButtonForm
                  position="justify-center"
                  loading={loading}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonAdd
