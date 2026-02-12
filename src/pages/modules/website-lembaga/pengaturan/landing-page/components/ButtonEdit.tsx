import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Form } from '@/components/ui/form'
import ButtonForm from '@/components/common/button/ButtonForm'
import ImageUpload from './ImageUpload'
import type { LandingList } from '../model'
import { useQueryClient } from '@tanstack/react-query'
import { LandingPageInstutationResolver, type LandingPageInstutationType } from '../model/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

interface Props {
  data: LandingList
}
const ButtonEdit = ({ data: dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<LandingPageInstutationType>({
    resolver: zodResolver(LandingPageInstutationResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: LandingPageInstutationType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(`/lembaga/background/${dataProps.id_lembaga_background}`, {
        ...data,
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: ['landing-page-pengaturan'],
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
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            gambar_url: dataProps.gambar_url,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Edit Gambar Landing Page</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <ImageUpload maxSizeMB={2} form={form} name="gambar_url" label="Gambar(Ukuran 4:2)" />
              <div className="text-center">
                <ButtonForm
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

export default ButtonEdit
