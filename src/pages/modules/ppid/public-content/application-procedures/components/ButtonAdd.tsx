import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import ImageUpload from './ImageUpload'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { ApplicationProceduresResolver, type ApplicationProceduresType } from '../model/resolver'
import TextInput from '@/components/common/form/TextInput'

const ButtonAdd = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<ApplicationProceduresType>({
    resolver: zodResolver(ApplicationProceduresResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: ApplicationProceduresType) {
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/unit-ppid/tata-cara-permohonan`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['tata-cara-permohonan'],
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
        title={<p className="text-2xl ">Tambah Tata Cara Permohonan</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ImageUpload maxSizeMB={2} form={form} name="url_gambar" label="Gambar(Ukuran 4:2)" />
              <TextInput form={form} name="judul" label="Judul" isRow placeholder='Judul'/>

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
