import ButtonForm from '@/components/common/button/ButtonForm'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { InputText } from '@/components/common/form/InputText'
import { IconEdit } from '@/components/common/table/icon'
import { Form } from '@/components/ui/form'
import AxiosClient from '@/provider/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'
export const InformationPublicGlobalResolver = z.object({
  judul: z.string({ error: 'Judul Wajib Diisi' }).min(1, { error: 'Judul Wajib Diisi' }),
  urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
})

export type InformationPublicGlobalType = z.infer<typeof InformationPublicGlobalResolver>
interface Props {
  title: string
  linkPost: string
  keyLinkPost: string
  data: any
}

const ButtonEditInformationPublic = ({ title, keyLinkPost, linkPost,data:dataProps }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<InformationPublicGlobalType>({
    resolver: zodResolver(InformationPublicGlobalResolver),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  async function handleSave(data: InformationPublicGlobalType) {
    setLoading(true)
    try {
      const res = await AxiosClient.put(linkPost, {
        ...data,
        urutan: Number(data.urutan),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: [keyLinkPost],
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
    <div className="flex items-center justify-between">
      <button
        onClick={() => {
          setOpen(true)
          form.reset({
            ...dataProps,
            urutan:dataProps.urutan.toString()
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        className="max-w-2xl! w-[90wdv] md:w-full!"
        open={open}
        setOpen={setOpen}
      
        title={<p className="text-2xl ">Edit {title}</p>}
      >
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <InputText form={form} name="judul" isRow label="Judul*" placeholder="Judul" />
                <InputText form={form} name="urutan" isRow label="Urutan*" placeholder="Urutan" />
              </div>
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
    </div>
  )
}

export default ButtonEditInformationPublic
